"use server";
import prisma from "@/lib/db";
import { RegisterFormSchema } from "@/schemas/validateSchema";
import * as z from "zod";
import bcrypt from "bcrypt";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

// async function
// validate fields
// parse password with bcrypt
// get user by email from data
// create user in db

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validateFields = RegisterFormSchema.parse(values);

  if (!validateFields) {
    return { error: "Invalid fields!" };
  }
  const { name, email, password } = validateFields;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate verification token, send email
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "User created!" };
};
