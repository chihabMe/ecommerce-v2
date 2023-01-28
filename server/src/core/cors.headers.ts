import { ALLOWED_ORIGINS } from "./constance";
import { Request } from "express";

export const corsOptionsDelegate = (req: Request, callback: any) => {
  let corsOptions;
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.indexOf(origin) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: true };
  }
  callback(null, corsOptions);
};
