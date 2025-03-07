import { NextResponse } from "next/server";

import { NextAuthRequest } from "@/lib/middlewares/types";

export const loggingMiddleware = async (
  req: NextAuthRequest,
  res: NextResponse,
  next: () => Promise<NextResponse>,
) => {
  console.log(`[Middleware Logger] Request to: ${req.nextUrl.pathname}`);

  // Time the middleware chain execution
  const startTime = Date.now();
  const response = await next();
  const duration = Date.now() - startTime;

  console.log(`[Middleware Logger] Completed in ${duration}ms`);

  return response;
};
