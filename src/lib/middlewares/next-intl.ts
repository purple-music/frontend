import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

import { NextAuthRequest } from "./types";

export function nextIntlMiddleware(req: NextAuthRequest) {
  return createMiddleware(routing)(req);
}
