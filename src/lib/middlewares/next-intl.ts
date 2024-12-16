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
    }
  }

  // If not, try to get it from the header
  if (!locale) {
    locale = acceptLanguage.get(req.headers.get("Accept-Language"));
  }
  // Otherwise, use the fallback locale
  if (!locale) {
    locale = fallbackLocale;
  }

  return locale;
}

const middleware = createMiddleware(routing);

export function nextIntlMiddleware(req: NextAuthRequest) {
  const locale = findLocale(req);

  // Redirect if locale in path is not supported (has already path prefix or shouldn't be localized)
  if (
    !locales.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !noLngRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}`, req.url),
    );
  }

  // If there is a referer, set the locale in the cookie
  const referer = req.headers.get("referer");
  if (referer) {
    const refererUrl = new URL(referer);
    const refererLocale = locales.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (refererLocale) {
      response.cookies.set(cookieName, refererLocale);
    }
    return response;
  }

  return middleware(req);
}
