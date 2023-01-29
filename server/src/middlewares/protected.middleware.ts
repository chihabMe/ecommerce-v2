import { User } from "@prisma/client";
import cookie from "cookie";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../core/database";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.cookies["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.ACCESS_SECRET ?? "",
    async (err: any, data: any) => {
      if (err) return res.status(401).json("invalid token");
      const user = await prisma.user.findUnique({
        where: {
          //@ts-ignore
          id: data.id,
        },
      });
      //@ts-ignore
      req.user = user;
      next();
    }
  );
};
