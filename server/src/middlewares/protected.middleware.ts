import cookie from "cookie";
import { Request, Response, NextFunction } from "express";
import { access } from "fs";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  next();
};
