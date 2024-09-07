import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import prisma from "@/lib/db";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";
import { setupNewUser } from "@/actions/setupNewUser";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
    async signIn({ user, account, isNewUser }) {
      // If this is a new user, set up their default tags, decks, and cards
      if (isNewUser && account?.provider !== "credentials") {
        const existingDecks = await prisma.deck.findMany({
          where: { authorId: user.id },
        });

        // If the user has no decks (meaning they're a new user), set up the default ones
        if (user.id && existingDecks.length === 0) {
          await setupNewUser(user.id);
        }
      }
    },
  },
  // cookies: {
  //   sessionToken: {
  //     name: `__Host-next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //     },
  //   },
  // },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user) return false;

      if (user.id) {
        const existingUser = await getUserById(user?.id); // Add a check for user.id
        // Prevent sign in without email verification
        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // if (token.role && session.user) {
      //   session.user.role = token.role as UserRole;
      // }

      // if (session.user) {
      //   session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      // }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email ?? "";
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      // token.role = existingUser.role;
      // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  ...authConfig,
});
