/**
 * Routes that do not require authentication
 */
export const publicRoutes: string[] = [
  "/",
  "/auth/new-verification",
  "/test",
  "/test/another-test-1",
  "/test/another-test-2",
];

/**
 * Routes that redirect to /my
 */
export const authRoutes: string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
  "/auth/mini-app-auth",
];

/**
 * Routes that shouldn't be redirected to /[lng]
 */
export const noLngRoutes: string[] = ["/_next", "/api"];

/**
 * The prefix for API authentication routes
 *
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * The default redirect path after loggin in
 */
export const DEFAULT_LOGIN_REDIRECT = "/my";
