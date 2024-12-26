import acceptLanguage from "accept-language";
import NextAuth from "next-auth";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";

import authConfig from "@/auth.config";
import i18nConfig from "@/i18nConfig";
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

interface Config {
  locales: readonly string[];
  defaultLocale: string;
  localeCookie?: string;
  prefixDefault?: boolean;
  basePath?: string;
  serverSetCookie?: "if-empty" | "always" | "never";
  cookieOptions?: Partial<ResponseCookie>;
}

function i18nMiddleware(req: NextAuthRequest, i18nConfig: Config) {
  if (!req) {
    throw new Error("i18n middleware requires a request object");
  }
  if (!i18nConfig) {
    throw new Error("i18n middleware requires a config object");
  }

  const {
    locales,
    defaultLocale,
    prefixDefault = false,
    localeCookie = "NEXT_LOCALE",
    basePath = "",
    cookieOptions = {
      path: req.nextUrl.basePath || undefined,
      sameSite: "strict",
      maxAge: 31536000, // one year
    },
  } = i18nConfig;

  console.log("===> Running i18n middleware with config:", i18nConfig);

  const pathname = req.nextUrl.pathname;
  const basePathTrailingSlash = (i18nConfig.basePath || "").endsWith("/");

  const responseOptions = {
    request: {
      headers: new Headers(req.headers),
    },
  };

  let response = NextResponse.next(responseOptions);

  // If the path is a noLngRoute, skip the middleware
  const isNoLngRoute = noLngRoutes.some((route) => pathname.startsWith(route));
  if (isNoLngRoute) {
    console.log("===> Skipping noLngRoute");
    return NextResponse.next(responseOptions);
  }

  let cookieLocale;
  if (localeCookie) {
    const cookieValue = req.cookies.get(localeCookie)?.value;

    if (cookieValue && locales.includes(cookieValue)) {
      cookieLocale = cookieValue;
    }
  }

  console.log("===> Cookie locale:", cookieLocale);

  const pathLocale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`,
  );

  console.log("===> Path locale:", pathLocale);

  if (!pathLocale) {
    let locale = cookieLocale || findLocale(req);

    // console.log("===> Path locale not found, using locale:", locale);

    if (!locales.includes(locale)) {
      console.warn("findLocale returned an invalid locale:", locale);
      locale = defaultLocale;
    }

    let newPathname = `${locale}${pathname}`;

    // Avoid double redirect: / => /en/ => /en
    if (pathname === "/") {
      newPathname = newPathname.slice(0, -1);
    }

    newPathname = `${basePath}${basePathTrailingSlash ? "" : "/"}${newPathname}`;

    if (req.nextUrl.search) {
      newPathname += req.nextUrl.search;
    }

    console.log("===> Redirecting to", newPathname);
    if (prefixDefault || locale !== defaultLocale) {
      // console.log("===> Redirecting with redirect");
      response = NextResponse.redirect(new URL(newPathname, req.url));
    } else {
      // console.log("===> Redirecting with rewrite");
      // prefixDefault is false and locale is defaultLocale
      // NOTE: NextResponse.rewrite CRASHES everything. DON'T USE IT
      response = NextResponse.redirect(new URL(newPathname, req.url));
    }
  } else {
    const setCookie = () => {
      response.cookies.set(localeCookie, pathLocale, cookieOptions);
    };

    console.log("===> Path locale found:", pathLocale);
    // If the path starts with a locale, set the cookie
    if (cookieLocale && cookieLocale !== pathLocale) {
      // Cookie locale is different from path locale, update it
      setCookie();
    }
  }

  response.headers.set("X-i18n-router-locale", pathLocale || defaultLocale);

  // console.log("===> i18n middleware returning response:", response);

  return response;
}

const { auth } = NextAuth(authConfig);
const appMiddleware = auth(async (req: NextAuthRequest, res) => {
  console.log("===> Running middleware on path:", req.nextUrl.pathname);
  const authResponse = await authMiddleware(req);

  // console.log("authResponse", authResponse);
  if (authResponse) {
    console.log("===> Returning authResponse");
    return authResponse;
  }

  const i18nResponse = i18nMiddleware(req, i18nConfig);

  if (i18nResponse) {
    console.log("===> Returning i18nResponse");
    return i18nResponse;
  }

  console.log("===> Allowing request to continue");
  return NextResponse.next();

  // // TODO: Support referer header
  // const pathname = req.nextUrl.pathname;
  //
  // const isNoLngRoute = noLngRoutes.some((route) => pathname.startsWith(route));
  //
  // // If there's a path like /api or /_next, don't do anything
  // if (isNoLngRoute) {
  //   console.log("===> Skipping noLngRoute");
  //   return NextResponse.next();
  // }
  //
  // const locale = findLocale(req);
  //
  // console.log("===> Locale found:", locale);
  // const startsWithLocale = i18nConfig.locales.some((loc) =>
  //   pathname.startsWith(`/${loc}`),
  // );
  //
  // // If the path doesn't start with a locale, redirect to the correct one
  // if (!startsWithLocale) {
  //   console.log(
  //     "===> Redirecting to",
  //     `/${locale}${pathname}${req.nextUrl.search}`,
  //   );
  //   return NextResponse.redirect(
  //     new URL(`/${locale}${pathname}${req.nextUrl.search}`, req.url),
  //   );
  // }
  //
  // console.log("===> Setting cookie");
  // const response = NextResponse.next();
  // response.cookies.set(cookieName, locale);
  // console.log(
  //   "===> Returning response:",
  //   response,
  //   "on path:",
  //   req.nextUrl.pathname,
  // );
  // return response;
});

export default async function middleware(req: NextAuthRequest, ev: any) {
  // try {
  return appMiddleware(req, ev);
  // } catch (e) {
  //   console.log("ERROR", e);
  // }
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
