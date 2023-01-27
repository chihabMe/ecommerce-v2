import cookie from "cookie";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(jwt.decode(token ?? ""));
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_SECRET ?? "", (err, user) => {
    if (err) return res.status(403).json("invalid token");
    next();
  });
};
