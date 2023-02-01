import { Request, Response, NextFunction } from "express";
export const _404 = (req: Request, res: Response) => {
  return res.sendStatus(404);
};
export const _500 = (req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  next();
};
