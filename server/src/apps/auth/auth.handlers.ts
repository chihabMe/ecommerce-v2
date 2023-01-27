import { Request, Response } from "express";
import cookie from "cookie";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { loginSchema, registrationSchemas } from "./auth.schemas";
import * as authServices from "./auth.services";
import { compareSync } from "bcrypt";
import { prisma } from "../../core/database";
import { accessMaxAge } from "../../core/constance";
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
    console.log("--------");
    // const token = jwt.encode({
    //   secret:process.env.SECRET_KEY??"",
    //   maxAge:accessMaxAge,
    //   token:{
    //     name:user.name,
    //     id:user.id
    //   }
    // })
    // console.log(token)
    console.log("--------");
    res.setHeader("Set-Cookie", [
      cookie.serialize("access", "accessToken", {
        secure: false,
        maxAge: 60 * 60 * 24,
        httpOnly: true,
      }),
      cookie.serialize("refresh", "refreshToken", {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30,
      }),
    ]);
    return res.status(200).json({ status: "success" });
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
      console.log("hash=>", hash);
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
