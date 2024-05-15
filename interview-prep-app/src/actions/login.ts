"use server";

import { getUserByEmail } from "@/data/user";
import { LoginFormSchema } from "@/lib/validateSchema";
import * as z from "zod";
import { compare } from "bcrypt";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { signIn } from "../../auth";
import { AuthError } from "next-auth";

// async function
// call authorize function from  auth.config.ts (will validate with database)
// call two factor confirmation
export const login = async (
  values: z.infer<typeof LoginFormSchema>,
  callbackUrl?: string | null
) => {
  const validateFields = LoginFormSchema.parse(values);

  if (!validateFields) {
    return { error: "Invalid Credentials" };
  }

  const { email, password } = validateFields;

  // validate Email
  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    return { error: "Invalid User / No existing Email." };
  }

  const passwordMatch = await compare(password, user.password);
  // validate Password

  if (!passwordMatch) {
    return { error: "Invalid Password." };
  }

  // call signIn function from auth.config.ts

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT || callbackUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
