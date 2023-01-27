import express, { Request, Response, Router } from "express";
import * as dotenv from "dotenv";
import { getAllTodosHandler } from "./apps/todos/todos.handlers";
import morgan from "morgan";
import helmet from "helmet";
import { authRouter } from "./apps/auth/auth.routes";
import { todosRouter } from "./apps/todos/todos.routes";
dotenv.config();
const registerRoutes = (app: Router) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/todos", todosRouter);
};
const main = () => {
  const app = express();
  //middleware
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("tiny"));
  //register apps
  registerRoutes(app);
  //
  const port = process.env.PORT ?? 3000;

  app.listen(port, () => {
    console.log(`run on ${port}`);
  });
};

main();
