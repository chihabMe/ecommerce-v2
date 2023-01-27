import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import * as todosServices from "./todos.services";

const prisma = new PrismaClient();

export const getAllTodosHandler = async (req: Request, res: Response) => {
  const todos = await todosServices.getAllTodosService();
  return res.status(200).json({ todos });
};

export const addTodoHandler = async (
  req: Request<{}, {}, { body: string }>,
  res: Response
) => {
  const { body } = req.body;
  if (!body)
    return res
      .status(403)
      .json({ status: "error", errors: "body is required" });

  try {
    const firstUser = await prisma.user.findFirst({
      where: {
        name: "chihab",
      },
    });
    if (!firstUser) return res.sendStatus(403);
    const todo = await todosServices.createTodoService({
      body,
      userId: firstUser.id,
    });
    return res.status(201).json({ status: "success", todo });
  } catch (err) {
    res.sendStatus(403);
  }
};
export const updateTodoHandler = async (
  req: Request<{ id: string }, {}, { body: string; done?: boolean }>,
  res: Response
) => {
  const { id } = req.params;
  const { body, done } = req.body;
  try {
    const todo = await todosServices.updateTodoService({
      id,
      body,
      done,
    });
    return res.status(201).json({ message: "success", todo });
  } catch (error: any) {
    return res.status(403).json();
  }
};
export const deleteTodoHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  return res.status(201).json(`deleted ${id}`);
};
