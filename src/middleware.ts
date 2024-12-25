import acceptLanguage from "accept-language";
import { NextApiResponse } from "next";
import NextAuth from "next-auth";
import { NextFetchEvent, NextResponse } from "next/server";

import authConfig from "@/auth.config";
import { i18nConfig } from "@/i18n/routing";
import { authMiddleware } from "@/lib/middlewares/auth";
import { NextAuthRequest } from "@/lib/middlewares/types";
import { noLngRoutes } from "@/routes";

const cookieName = "NEXT_LOCALE";

acceptLanguage.languages(i18nConfig.locales);

function findLocale(req: NextAuthRequest) {
  let locale: string | null = null;

  // Try to get the locale from the cookie
  if (req.cookies.has(cookieName)) {
    const localeFromCookie = req.cookies.get(cookieName)?.value;
    if (localeFromCookie) {
      locale = acceptLanguage.get(localeFromCookie);
      console.log("locale.cookie", locale);
    }
  }

  // If not, try to get it from the header
  if (!locale) {
    locale = acceptLanguage.get(req.headers.get("Accept-Language"));
    console.log("locale.header", locale);
  }
  // Otherwise, use the fallback locale
  if (!locale) {
    locale = i18nConfig.defaultLocale;
  }
  console.log("locale.fallback", locale);

  return locale;
}

const { auth } = NextAuth(authConfig);
export default auth(async (req: NextAuthRequest, res) => {
  console.log("===> Running middleware on path:", req.nextUrl.pathname);
  const authResponse = await authMiddleware(req);

  // console.log("authResponse", authResponse);
  if (authResponse) {
    console.log("===> Returning authResponse");
    return authResponse;
  }

  // TODO: Support referer header
  const pathname = req.nextUrl.pathname;

  const isNoLngRoute = noLngRoutes.some((route) => pathname.startsWith(route));

  // If there's a path like /api or /_next, don't do anything
  if (isNoLngRoute) {
    console.log("===> Skipping noLngRoute");
    return NextResponse.next();
  }

  const locale = findLocale(req);

  console.log("===> Locale found:", locale);
  const startsWithLocale = i18nConfig.locales.some((loc) =>
    pathname.startsWith(`/${loc}`),
  );

  // If the path doesn't start with a locale, redirect to the correct one
  if (!startsWithLocale) {
    console.log(
      "===> Redirecting to",
      `/${locale}${pathname}${req.nextUrl.search}`,
    );
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url),
    );
  }

  console.log("===> Setting cookie");
  const response = NextResponse.next();
  response.cookies.set(cookieName, locale);
  console.log(
    "===> Returning response:",
    response,
    "on path:",
    req.nextUrl.pathname,
  );
  return response;
});

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
