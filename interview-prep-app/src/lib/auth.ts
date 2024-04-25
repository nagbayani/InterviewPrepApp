import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        console.log("BEFORE: CREDENTIALS", credentials);

        const existingUser = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!existingUser) {
          console.log("NO EXISTING EMAIL");
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          console.log("WRONG PASSWORD");
          return null;
        }

        console.log("AUTHORIZE CREDENTIALS GOOD");
        console.log("AFTER: CREDENTIALS", existingUser);

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
  callbacks: {
    // authorize (returns id, username, email) -> jwt -> session
    async jwt({ token, user }) {
      if (user) {
        return { ...token, username: user.username };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
      return session;
    },
  },
};
