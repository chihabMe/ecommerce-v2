import { Request, Response } from "express";
import cookie from "cookie";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {
  loginSchema,
  refreshTokenSchema,
  registrationSchemas,
} from "./auth.schemas";
import * as authServices from "./auth.services";
import { compareSync } from "bcrypt";
import { prisma } from "../../core/database";
import jwt from "jsonwebtoken";
interface RegisterResponseErrors {
  fieldErrors: {
    name: string[];
    email: string[];
  };
}
export const loginHandler = async (
  req: Request<{}, {}, { password: string; email: string }>,
  res: Response
) => {
  const valid = loginSchema.safeParse(req.body);

  if (!valid.success)
    return res
      .status(403)
      .json({ status: "error", errors: valid.error.formErrors });

  const { password, email } = req.body;
  try {
    const user = await authServices.getUserByEmail({ email });
    if (!user)
      return res.status(403).json({
        status: "error",
        errors: "please check your email and password",
      });
    const compare = compareSync(password, user.password);
    if (!compare)
      return res.status(403).json({
        status: "error",
        errors: "please check your email and password",
      });
    const accessToken = authServices.generateAccessToken({ user });
    const refreshToken = await authServices.generateRefreshToken({ user });
    return res
      .status(200)
      .json({ status: "success", accessToken, refreshToken });
  } catch (err) {
    return res.status(403).json({
      status: "error",
      errors: "please check your email and password",
    });
  }
};

export const registerHandler = async (
  req: Request<
    {},
    {},
    { email: string; password: string; rePassword: string; name: string }
  >,
  res: Response
) => {
  const valid = registrationSchemas.safeParse(req.body);
  if (!valid.success)
    return res
      .status(403)
      .json({ status: "error", errors: valid.error.formErrors });
  const { email, name, password, rePassword } = req.body;
  const errors: RegisterResponseErrors = {
    fieldErrors: {
      email: [],
      name: [],
    },
  };
  const usedEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  const usedName = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  if (usedEmail || usedName) {
    if (usedEmail) errors.fieldErrors.email.push("this email is been used");
    if (usedName) errors.fieldErrors.name.push("this name is been used");
    return res.status(403).json({ status: "error", errors });
  }

  return hash(password, 14, async (err, hash) => {
    if (err) return res.sendStatus(403);
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hash,
        },
      });
      return res.sendStatus(201);
    } catch (err) {
      return res.sendStatus(403);
    }
  });
};

export const refreshTokenHandler = async (
  req: Request<{}, {}, { token: string }>,
  res: Response
) => {
  const valid = refreshTokenSchema.safeParse(req.body);
  if (!valid.success)
    return res.status(403).json(valid.error.formErrors.fieldErrors);
  const { token } = req.body;

  //verify if this refresh token is generate by the server and if its saved in the database
  const refreshToken = await authServices.verifyRefreshToken({
    token,
  });
  //if the refresh token is invalid or its not in the database return 403 error
  if (!refreshToken) return res.status(403).json("invalid refresh token");
  //@ts-ignore
  const id: string = jwt.decode(token).id;
  //get the user by the extracted  id
  const user = await authServices.getUserById({ id });
  if (!user) return res.sendStatus(403);
  //delete the current refresh token
  await authServices.deleteRefreshToken({ token });
  //generate new refresh and access tokens
  const newAccessToken = authServices.generateAccessToken({ user });
  const newRefreshToken = await authServices.generateRefreshToken({ user });
  //return the refresh / access tokens
  return res.status(200).json({
    status: "success",
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
};
