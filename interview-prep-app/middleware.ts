import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  console.log("MIDDLEWARE");
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If the route is an API auth route, allow it
  if (isApiAuthRoute) {
    return;
  }

  // If authenticated, allow the route
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  // If not logged in, and is not a public route, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  console.log("ROUTE", req.nextUrl.pathname);
  console.log(isLoggedIn ? "Logged in" : "Not logged in");
  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export default { providers: [GitHub] } satisfies NextAuthConfig;
