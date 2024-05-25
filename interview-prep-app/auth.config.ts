// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { LoginFormSchema } from "@/schemas/validateSchema";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

import prisma from "@/lib/db";

export default {
  providers: [
    // Manual Login
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

          // compare passwords
          const passwordMatch = await bcrypt.compare(password, user.password);

          // Successful login
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
