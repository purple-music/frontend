import authConfig from "@/auth.config";
import { authMiddleware } from "@/lib/middlewares/auth";
import { i18nMiddleware } from "@/lib/middlewares/i18n";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);
export default auth(async (req, _next) => {
  const authResponse = await authMiddleware(req);

  if (authResponse) {
    return authResponse;
  }

  const i18nResponse = await i18nMiddleware(req);

  if (i18nResponse) {
    return i18nResponse;
  }

  return NextResponse.next();
});

export const config = {
  // https://clerk.com/docs/references/nextjs/auth-middleware#usage
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/",
  ],
};
