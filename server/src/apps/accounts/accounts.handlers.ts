import { Request, Response } from "express";
import status from "http-status";
import type {
  RequestWithUser,
  RequestWithUser2,
} from "../../common/interfaces";

export const currentUserHandler = (req: Request, res: Response) => {
  //@ts-ignore
  const user = { ...req.user };
  if (!user) return res.sendStatus(401);
  delete user.password;
  return res.status(status.OK).json(user);
};
