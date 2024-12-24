import { NextApiResponse } from "next";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import authConfig from "@/auth.config";
import { authMiddleware } from "@/lib/middlewares/auth";
import { NextAuthRequest } from "@/lib/middlewares/types";

import { nextIntlMiddleware } from "./lib/middlewares/next-intl";

const { auth } = NextAuth(authConfig);
const appRouteHandler = auth(async (req, _next) => {
  console.log("===> Running middleware on path:", req.nextUrl.pathname);
  const authResponse = await authMiddleware(req);

  // console.log("authResponse", authResponse);
  if (authResponse) {
    console.log("===> Returning authResponse");
    return authResponse;
  }

  // console.log("Running nextIntlMiddleware");
  const nextIntlResponse = await nextIntlMiddleware(req);

  // console.log("nextIntlResponse", nextIntlResponse);
  if (nextIntlResponse) {
    console.log("===> Returning nextIntlResponse");
    return nextIntlResponse;
  }

  console.log("===> Middleware done");
  return NextResponse.next();
});

export default function handler(req: NextAuthRequest, res: any) {
  console.log("===> handler on path:", req.nextUrl.pathname);
  return appRouteHandler(req, res);
}

export const config = {
  // https://clerk.com/docs/references/nextjs/auth-middleware#usage
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Match internationalized pathnames
    "/(ru|en)/(.*)",
    "/",
  ],
};
