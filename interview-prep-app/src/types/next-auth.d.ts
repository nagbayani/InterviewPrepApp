import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      name: string;
    };
    token: {
      name: string;
    };
  }
}
