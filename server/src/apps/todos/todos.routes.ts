import { Router } from "express";
import {
  addTodoHandler,
  deleteTodoHandler,
  getAllTodosHandler,
  updateTodoHandler,
} from "./todos.handlers";
import { authMiddleware } from "../../middlewares/protected.middleware";

export const todosRouter = Router();
todosRouter.use(authMiddleware);
todosRouter.get("/", getAllTodosHandler);
todosRouter.post("/", addTodoHandler);
todosRouter.put("/:id", updateTodoHandler);
todosRouter.delete("/:id", deleteTodoHandler);
