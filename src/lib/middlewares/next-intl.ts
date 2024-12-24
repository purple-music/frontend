import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { routing } from "@/i18n/routing";
import { noLngRoutes } from "@/routes";

import { NextAuthRequest } from "./types";

const middleware = createMiddleware(routing);

export function nextIntlMiddleware(req: NextAuthRequest) {
  const isNoLngRoute = noLngRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );

  // If there's a path like /api or /_next, don't do anything
  if (isNoLngRoute) {
    console.log(`i18n: Skipping ${req.nextUrl.pathname}`);
    return NextResponse.next();
  }

  return middleware(req);
}
