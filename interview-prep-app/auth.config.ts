// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "@/lib/validateSchema";
import bcrypt from "bcryptjs";

import prisma from "@/lib/db";

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        const validatedFields = LoginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            console.log("NO EXISTING EMAIL / PASSWORD");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
