import { NextResponse } from "next/server";

import { NextAuthRequest } from "@/lib/middlewares/types";

export type NextFunction = (trace?: string) => Promise<NextResponse>;

export type MiddlewareFunction = (
  req: NextAuthRequest,
  res: NextResponse,
  next: NextFunction,
) => Promise<NextResponse>;

export class MiddlewareChain {
  private readonly middlewares: MiddlewareFunction[] = [];
  private readonly logger: (message: string, ...args: any[]) => void;

  constructor(
    initialMiddlewares: MiddlewareFunction[] = [],
    logger = console.log,
  ) {
    this.middlewares = initialMiddlewares;
    this.logger = logger;
  }

  use(middleware: MiddlewareFunction) {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(req: NextAuthRequest) {
    let response = NextResponse.next({
      request: {
        headers: new Headers(req.headers),
      },
    });

    // Create a chain of next functions
    const executeMiddleware = async (index: number): Promise<NextResponse> => {
      // If we've gone through all middlewares, return the final response
      if (index >= this.middlewares.length) {
        return response;
      }

      const currentMiddleware = this.middlewares[index];

      if (!currentMiddleware) {
        this.logger(
          `[Middleware] Invariant violation: Middleware at index ${index} is undefined`,
        );
        return response;
      }

      // Create the next function that will run the next middleware
      const next: NextFunction = async (
        trace?: string,
      ): Promise<NextResponse> => {
        if (trace) {
          this.logger(`[Middleware] Trace: ${trace}`);
        }
        return executeMiddleware(index + 1);
      };

      try {
        this.logger(
          `[Middleware] Executing middleware: ${currentMiddleware.name || "anonymous"}`,
        );

        // Execute the current middleware with the next function
        response = await currentMiddleware(req, response, next);
        return response;
      } catch (error) {
        this.logger(
          `[Middleware] Middleware error in ${currentMiddleware.name || "anonymous"}:`,
          error,
        );
        // You can decide how to handle errors - here we continue the chain
        return next();
      }
    };

    // Start the chain with the first middleware
    return executeMiddleware(0);
  }
}
