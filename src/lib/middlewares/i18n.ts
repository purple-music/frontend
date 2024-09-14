import { cookieName, fallbackLng, languages } from "@/i18n/settings";
import { NextAuthRequest } from "@/lib/middlewares/types";
import { noLngRoutes } from "@/routes";
import { NextResponse } from "next/server";
import acceptLanguage from "accept-language";

acceptLanguage.languages(languages);

export async function i18nMiddleware(req: NextAuthRequest) {
  let lng: string | null = null;
  if (req.cookies.has(cookieName)) {
    const lngFromCookie = req.cookies.get(cookieName)?.value;
    if (lngFromCookie) lng = acceptLanguage.get(lngFromCookie);
  }
  if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!lng) lng = fallbackLng;

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !noLngRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  const referer = req.headers.get("referer");
  if (referer) {
    const refererUrl = new URL(referer);
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
