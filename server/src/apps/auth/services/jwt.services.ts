import { User } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { accessMaxAge, refreshMaxAge } from "../../../core/constance";
import { prisma } from "../../../core/database";
import { todosRouter } from "../../todos/todos.routes";
export function verifyAccessToken({ token }: { token: string }): boolean {
  let valid = false;
  jwt.verify(token, process.env.ACCESS_SECRET ?? "", async (err, data) => {
    if (!err) valid = true;
  });
  return valid;
}
export async function verifyRefreshToken({
  token,
}: {
  token: string;
}): Promise<boolean> {
  let valid = false;
  await jwt.verify(
    token,
    process.env.REFRESH_SECRET ?? "",
    async (err, data) => {
      if (!err) {
        //@ts-ignore
        const id: string = data.id;
        const all = await prisma.refreshToken.findMany({
          where: {
            userId: id,
          },
        });
        const refreshToken = await prisma.refreshToken.findFirst({
          where: {
            userId: id,
            body: token,
          },
        });
        valid = refreshToken != null;
      }
    }
  );
  return valid;
}

export function generateAccessToken({ user }: { user: User }) {
  const userData = {
    id: user.id,
    name: user.name,
  };
  return jwt.sign(userData, process.env.ACCESS_SECRET ?? "", {
    expiresIn: accessMaxAge,
  });
}
export async function deleteRefreshToken({ token }: { token: string }) {
  return await prisma.refreshToken.deleteMany({
    where: {
      body: token,
    },
  });
}
export async function generateRefreshToken({ user }: { user: User }) {
  const userData = {
    id: user.id,
    name: user.name,
  };
  const refreshToken = jwt.sign(userData, process.env.REFRESH_SECRET ?? "", {
    expiresIn: refreshMaxAge,
  });
  await prisma.refreshToken.create({
    data: {
      body: refreshToken,
      userId: user.id,
    },
  });
  return refreshToken;
}

export function setTokens({
  res,
  refresh,
  access,
  clear,
}: {
  res: Response;
  refresh: string;
  access: string;
  clear?: boolean;
}) {
  const isProduction: boolean = process.env.MODE === "PRODUCTION";
  res.cookie("authorization", "Bearer " + access, {
    secure: isProduction,
    domain: process.env.DOMAIN,
    httpOnly: true,
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
    maxAge: clear ? 0 : accessMaxAge * 1000,
  });
  res.cookie("refresh", refresh, {
    secure: isProduction,
    domain: process.env.DOMAIN,
    httpOnly: true,
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
    maxAge: clear ? 0 : refreshMaxAge * 1000,
  });
}
