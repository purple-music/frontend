import acceptLanguage from "accept-language";
import { NextResponse } from "next/server";

import i18nConfig from "@/i18nConfig";
import { MiddlewareFunction } from "@/lib/middlewares/MiddlewareChain";
import { NextAuthRequest } from "@/lib/middlewares/types";
import { noLngRoutes } from "@/routes";

function findLocale(req: NextAuthRequest, cookieName: string) {
  let locale: string | null = null;

  // Try to get the locale from the cookie
  if (req.cookies.has(cookieName)) {
    const localeFromCookie = req.cookies.get(cookieName)?.value;
    if (localeFromCookie) {
      locale = acceptLanguage.get(localeFromCookie);
      // console.log("locale.cookie", locale);
    }
  }

  // If not, try to get it from the header
  if (!locale) {
    locale = acceptLanguage.get(req.headers.get("Accept-Language"));
    // console.log("locale.header", locale);
  }
  // Otherwise, use the fallback locale
  if (!locale) {
    locale = i18nConfig.defaultLocale;
  }
  // console.log("locale.fallback", locale);

  return locale;
}

export const i18nMiddleware: MiddlewareFunction = async (req, res, next) => {
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

  const pathname = req.nextUrl.pathname;
  const basePathTrailingSlash = (i18nConfig.basePath || "").endsWith("/");

  // If the path is a noLngRoute, skip the middleware
  const isNoLngRoute = noLngRoutes.some((route) => pathname.startsWith(route));
  if (isNoLngRoute) {
    return next();
  }

  let cookieLocale;
  if (localeCookie) {
    const cookieValue = req.cookies.get(localeCookie)?.value;

    if (cookieValue && locales.includes(cookieValue)) {
      cookieLocale = cookieValue;
    }
  }

  const pathLocale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`,
  );

  if (!pathLocale) {
    let locale = cookieLocale || findLocale(req, localeCookie);

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

    if (prefixDefault || locale !== defaultLocale) {
      return NextResponse.redirect(new URL(newPathname, req.url));
    } else {
      // prefixDefault is false and locale is defaultLocale
      // NOTE: NextResponse.rewrite CRASHES everything. DON'T USE IT
      return NextResponse.redirect(new URL(newPathname, req.url));
    }
  } else {
    const setCookie = () => {
      res.cookies.set(localeCookie, pathLocale, cookieOptions);
    };

    // If the path starts with a locale, set the cookie
    if (cookieLocale && cookieLocale !== pathLocale) {
      // Cookie locale is different from path locale, update it
      setCookie();
    }
  }

  res.headers.set("X-i18n-router-locale", pathLocale || defaultLocale);

  return next();
};
