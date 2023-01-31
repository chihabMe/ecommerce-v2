import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { verifyAccessToken } from "../apps/auth/services";
import { prisma } from "../core/database";
import status from "http-status";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.cookies["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) return res.sendStatus(status.UNAUTHORIZED);
  const isValid = verifyAccessToken({
    token,
  });

  jwt.verify(
    token,
    process.env.ACCESS_SECRET ?? "",
    async (err: any, data: any) => {
      if (err) return res.status(status.UNAUTHORIZED).json("invalid token");
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
