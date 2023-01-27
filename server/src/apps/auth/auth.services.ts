import { PrismaClient, PrismaPromise, User } from "@prisma/client";
import { prisma } from "../../core/database";
export function getUserById({
  id,
}: {
  id: string;
}): PrismaPromise<User | null> {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
}
export function getUserByEmail({
  email,
}: {
  email: string;
}): PrismaPromise<User | null> {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export function getUserByName({
  name,
}: {
  name: string;
}): PrismaPromise<User | null> {
  return prisma.user.findFirst({
    where: {
      name,
    },
  });
}
