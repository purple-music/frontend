import { locales } from "@/i18n/settings";
import { NextAuthRequest } from "@/lib/middlewares/types";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

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

export async function authMiddleware(req: NextAuthRequest) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const pathname = removeLngFromPath(nextUrl.pathname);

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  console.log("isApiAuthRoute", isApiAuthRoute);
  console.log("isPublicRoute", isPublicRoute);
  console.log("isAuthRoute", isAuthRoute);
  console.log("isLoggedIn", isLoggedIn);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
}
