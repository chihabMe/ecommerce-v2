import { Router } from "express";
import { authMiddleware } from "../../middlewares/protected.middleware";
import { currentUserHandler } from "./accounts.handlers";

export const accountsRouter = Router();
accountsRouter.use(authMiddleware);

accountsRouter.get("/me", currentUserHandler);
