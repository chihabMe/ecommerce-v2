import { z } from "zod";

export const registrationSchemas = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "please use more than 6 characters"),
    rePassword: z.string(),
  })
  .refine((data) => data.password == data.rePassword, {
    message: "password don't match",
    path: ["rePassword"],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const tokenSchema = z.object({
  token: z.string(),
});
