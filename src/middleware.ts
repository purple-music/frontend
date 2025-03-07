import acceptLanguage from "accept-language";

import i18nConfig from "@/i18nConfig";
import { MiddlewareChain } from "@/lib/middlewares/MiddlewareChain";
import { authMiddleware } from "@/lib/middlewares/auth";
import { i18nMiddleware } from "@/lib/middlewares/i18nMiddleware";
import { loggingMiddleware } from "@/lib/middlewares/loggingMiddleware";
import { NextAuthRequest } from "@/lib/middlewares/types";

acceptLanguage.languages((i18nConfig.locales || []) as string[]);

export default async function middleware(req: NextAuthRequest) {
  const middlewareChain = new MiddlewareChain([], console.log);

  middlewareChain.use(loggingMiddleware);
  middlewareChain.use(authMiddleware);
  middlewareChain.use(i18nMiddleware);

  return await middlewareChain.execute(req);
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
