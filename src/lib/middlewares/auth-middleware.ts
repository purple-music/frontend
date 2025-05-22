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
  const hasAccessToken = !!req.cookies.get("access_token")?.value;
  const hasRefreshToken = !!req.cookies.get("refresh_token")?.value;

  const canRefresh = !hasAccessToken && hasRefreshToken;
  const isAuthenticated = hasAccessToken;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) {
    return next("Api Auth Route");
  }

  if (isAuthRoute) {
    if (isAuthenticated || canRefresh) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return next("Auth Route");
  }

  if (isAuthenticated) {
    return next("Has access token, can go");
  }
  if (canRefresh) {
    return next("No access token, but has refresh token");
  }
  if (isPublicRoute) {
    return next("Public route, anyone can go");
  }
  // You can't go
  return NextResponse.redirect(new URL("/auth/login", nextUrl));
};
