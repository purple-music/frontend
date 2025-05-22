import { NextResponse } from "next/server";

import i18nConfig from "@/i18nConfig";
import { MiddlewareFunction } from "@/lib/middlewares/middleware-chain";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

function removeLngFromPath(path: string) {
  let newPath = path;

  // If a path is starting with a language code, remove it
  if (i18nConfig.locales.some((loc) => newPath.startsWith(`/${loc}`))) {
    newPath = newPath.replace(`/${newPath.split("/")[1]}`, "");
  }

  // If pathname is now blank, redirect to /
  return newPath === "" ? "/" : newPath;
}

export const authMiddleware: MiddlewareFunction = async (req, res, next) => {
  const { nextUrl } = req;

  const pathname = removeLngFromPath(nextUrl.pathname);
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  // Verify JWT token if exists
  let isAuthenticated = !!accessToken;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return next("Api Auth Route");
  }

  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return next("Auth Route");
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return next("Auth Middleware");
};
