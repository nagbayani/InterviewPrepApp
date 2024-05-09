import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).max(100),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must have at least 8 characters" }),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must have than 8 characters" }),
});
