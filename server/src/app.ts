import express, { Request, Response, Router } from "express";
import * as dotenv from "dotenv";
import {} from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { authRouter } from "./apps/auth/auth.routes";
import cors from "cors";
import { todosRouter } from "./apps/todos/todos.routes";
import { corsOptionsDelegate } from "./core/cors.headers";
import { ALLOWED_ORIGINS } from "./core/constance";
import { accountsRouter } from "./apps/accounts/accounts.routes";
import cookieParser from "cookie-parser";
dotenv.config();
const registerRoutes = (app: Router) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/todos", todosRouter);
  app.use("/api/v1/accounts", accountsRouter);
};

const main = () => {
  const app = express();
  //middleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: ALLOWED_ORIGINS,
    })
  );
  //register apps
  registerRoutes(app);
  //
  const port = process.env.PORT ?? 3001;

  app.listen(port, () => {
    console.log(`run on ${port}`);
  });
};

main();
