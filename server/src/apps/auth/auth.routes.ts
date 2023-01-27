import { Router } from "express";
import cookie from "cookie";
import { loginHandler, registerHandler } from "./auth.handlers";

export const authRouter = Router();
authRouter.post("/token/obtain/", loginHandler);
authRouter.post("/register/", registerHandler);
