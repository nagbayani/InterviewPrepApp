import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

// const handler = NextAuth(authOptions);

interface RouteHandlerContext {
  params: { nextauth: string[] };
}

const handler = async (req: NextRequest, context: RouteHandlerContext) => {
  console.log("HEY ROUTE HANDLER HERE");
  return NextAuth(req, context, authOptions);
};

export { handler as GET, handler as POST };
