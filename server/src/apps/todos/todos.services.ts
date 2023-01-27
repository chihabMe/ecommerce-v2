import { PrismaClient, PrismaPromise, Todo } from "@prisma/client";
import { prisma } from "../../core/database";

export function getAllTodosService(): PrismaPromise<Todo[]> {
  return prisma.todo.findMany();
}
export function getTodoByIdService({
  id,
}: {
  id: string;
}): PrismaPromise<Todo | null> {
  return prisma.todo.findFirst({
    where: {
      id,
    },
  });
}
export function createTodoService({
  body,
  userId,
}: {
  body: string;
  userId: string;
}): PrismaPromise<Todo> {
  return prisma.todo.create({
    data: {
      body,
      userId,
    },
  });
}
export function updateTodoService({
  id,
  body,
  done,
}: {
  id: string;
  body: string;
  done?: boolean;
}): PrismaPromise<Todo> {
  return prisma.todo.update({
    where: {
      id,
    },
    data: {
      body,
      done,
    },
  });
}
