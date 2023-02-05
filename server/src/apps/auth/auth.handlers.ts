import { Request, Response } from "express";
import { hash } from "bcrypt";
import { loginSchema, registrationSchemas, tokenSchema } from "./auth.schemas";
import * as authServices from "./services";
import * as authUtils from "./utils"
import { compareSync } from "bcrypt";
import { prisma } from "../../core/database";
import jwt from "jsonwebtoken";
import status from "http-status";
interface RegisterResponseErrors {
  fieldErrors: {
    name?: string[];
    email?: string[];
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
    const accessToken = authUtils.generateAccessToken({ user });
    const refreshToken = await authUtils.generateRefreshToken({ user });

    authUtils.setTokens({
      res,
      access: accessToken,
      refresh: refreshToken,
    });
    return res.status(status.OK).json({
      status: "success",
      // , accessToken, refreshToken
    });
  } catch (err) {
    return res.status(status.BAD_REQUEST).json({
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
      .status(status.BAD_REQUEST)
      .json({ status: "error", errors: valid.error.formErrors.fieldErrors });
  const { email, name, password, rePassword } = req.body;
  const errors: RegisterResponseErrors = {
    fieldErrors: {},
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
    if (usedEmail) errors.fieldErrors.email = ["this email is been used"];
    if (usedName) errors.fieldErrors.name = ["this name is been used"];
    return res
      .status(status.BAD_REQUEST)
      .json({ status: "error", errors: errors?.fieldErrors });
  }

  return hash(password, 14, async (err, hash) => {
    if (err) return res.sendStatus(status.BAD_REQUEST);
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hash,
        },
      });
      return res.sendStatus(status.CREATED);
    } catch (err) {
      return res.sendStatus(status.BAD_REQUEST);
    }
  });
};

export const refreshTokenHandler = async (
  req: Request< {},{}, { token: string }>,
  res: Response
) => {
  // const valid = tokenSchema.safeParse(req.body);
  // if (!valid.success)
  // return res.status(403).json(valid.error.formErrors.fieldErrors);
  // const { token } = req.body;

  const token = req.cookies["refresh"] ?? req.headers["refresh"];
  if (!token)
    return res.status(status.UNAUTHORIZED).json("provide a refresh token");

  const refreshToken = await authUtils.verifyRefreshToken({
    token,
  });

  //if the refresh token is invalid or its not in the database return 401 error
  if (!refreshToken)
    return res.status(status.UNAUTHORIZED).json("invalid refresh token");
  //@ts-ignore
  const id: string = jwt.decode(token).id;
  //get the user by the extracted  id
  const user = await authServices.getUserById({ id });
  if (!user) return res.status(status.UNAUTHORIZED).json("invalid user");
  //delete the current refresh token
  await authUtils.deleteRefreshToken({ token });
  //generate new refresh and access tokens
  const newAccessToken = authUtils.generateAccessToken({ user });
  const newRefreshToken = await authUtils.generateRefreshToken({ user });
  //return the refresh / access tokens
  authUtils.setTokens({
    res,
    access: newAccessToken,
    refresh: newRefreshToken,
  });
  return res.status(status.OK).json({
    status: "success",
    access: newAccessToken,
    refresh: newRefreshToken,
  });
};

export const verifyAccessTokenHandler = async (
  req: Request<{}, {}, { token: string }>,
  res: Response
) => {
  // const valid = tokenSchema.safeParse(req.body);

  const access =
    req.cookies["authorization"] ?? req.headers["authorization"]?.split(" ")[1];
  if (!access)
    return res.status(status.UNAUTHORIZED).json("provide an access tokens");

  const isValid = authUtils.verifyAccessToken({ token: access });
  if (!isValid)
    return res.status(status.UNAUTHORIZED).json("invalid access token");

  return res.sendStatus(status.OK);
};

export const logoutHandler = async (req: Request, res: Response) => {
  const refresh = req.cookies["refresh"];
  await authUtils.deleteRefreshToken({
    token: refresh,
  });
  authUtils.clearTokens({res})

  return res.status(status.OK).json("logged out");
};
