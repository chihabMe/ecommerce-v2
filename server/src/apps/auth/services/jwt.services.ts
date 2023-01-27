import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { accessMaxAge, refreshMaxAge } from "../../../core/constance";
import { prisma } from "../../../core/database";
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
      //@ts-ignore
      const id: string = data.id;
      const refreshToken = await prisma.refreshToken.findFirst({
        where: {
          userId: id,
          body: token,
        },
      });
      valid = refreshToken != null;
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
  const token = await prisma.refreshToken.create({
    data: {
      body: refreshToken,
      userId: user.id,
    },
  });
  return refreshToken;
}
