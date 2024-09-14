import { NextMiddleware, NextRequest } from "next/server";
import { Session } from "next-auth";

export type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware;

// node_modules/next-auth/src/lib/index.ts
export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}
