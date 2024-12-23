import acceptLanguage from "accept-language";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { routing } from "@/i18n/routing";
import { cookieName, fallbackLocale, locales } from "@/i18n/settings";
import { noLngRoutes } from "@/routes";

import { NextAuthRequest } from "./types";

// import { NextResponse } from "next/server";

// import { cookieName, fallbackLng, languages } from "@/i18n/settings";
// import { NextAuthRequest } from "@/lib/middlewares/types";
// import { noLngRoutes } from "@/routes";

// acceptLanguage.languages(languages);

// export async function i18nMiddleware(req: NextAuthRequest) {
//   let lng: string | null = null;
//   if (req.cookies.has(cookieName)) {
//     const lngFromCookie = req.cookies.get(cookieName)?.value;
//     if (lngFromCookie) lng = acceptLanguage.get(lngFromCookie);
//   }
//   if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
//   if (!lng) lng = fallbackLng;

//   // Redirect if lng in path is not supported
//   if (
//     !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//     !noLngRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
//   ) {
//     return NextResponse.redirect(
//       new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
//     );
//   }

//   const referer = req.headers.get("referer");
//   if (referer) {
//     const refererUrl = new URL(referer);
//     const lngInReferer = languages.find((l) =>
//       refererUrl.pathname.startsWith(`/${l}`),
//     );
//     const response = NextResponse.next();
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
//     return response;
//   }

//   return NextResponse.next();
// }

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
    locale = fallbackLocale;
  }
  console.log("locale.fallback", locale);

  return locale;
}

function getSupportedRefererLocale(req: NextAuthRequest) {
  const referer = req.headers.get("referer");
  if (!referer) {
    return null;
  }

  const refererUrl = new URL(referer);
  const supportedLocale = locales.find((l) =>
    refererUrl.pathname.startsWith(`/${l}`),
  );
  return supportedLocale || null;
}

function removeLngFromPath(path: string) {
  let newPath = path;

  // If a path is starting with a language code, remove it
  if (locales.some((loc) => newPath.startsWith(`/${loc}`))) {
    newPath = newPath.replace(`/${newPath.split("/")[1]}`, "");
  }

  // If pathname is now blank, redirect to /
  if (newPath === "") {
    newPath = "/";
  }

  return newPath;
}

export function nextIntlMiddleware(req: NextAuthRequest) {
  const isNoLngRoute = noLngRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  // If there's a path like /api or /_next, don't do anything
  if (isNoLngRoute) {
    console.log(`i18n: Skipping ${req.nextUrl.pathname}`);
    return NextResponse.next();
  }

  const locale = findLocale(req);

  const handleI18nRouting = createMiddleware(routing);

  console.log("i18n: Locale", locale);
  console.log("i18n: Pathname", req.nextUrl.pathname);
  const startsWithLocale = locales.some((loc) =>
    req.nextUrl.pathname.startsWith(`/${loc}`),
  );

  // Check if the path starts with a supported locale
  if (startsWithLocale) {
    console.log("i18n: Path starts with locale", locale);
    // If it does, check if the locale is matching the current locale
    const pathLocale = req.nextUrl.pathname.split("/")[1];
    if (pathLocale !== locale) {
      // If it doesn't, we need to update the locale in the cookie
      req.cookies.set(cookieName, pathLocale);
      // TODO: Set the locale to nextIntl
      return handleI18nRouting(req);
    }
    // If the locale is matching, we can return
    return handleI18nRouting(req);
  }

  // If the path doesn't start with a locale, check the referer
  const refererLocale = getSupportedRefererLocale(req);
  console.log("i18n: Referer locale", refererLocale);

  const finalLocale = refererLocale || locale;

  // Redirect to the same path with the new locale
  console.log("i18n: Redirecting to", finalLocale);
  return NextResponse.redirect(
    new URL(
      `/${finalLocale}${req.nextUrl.pathname}${req.nextUrl.search}`,
      req.url,
    ),
  );
}
