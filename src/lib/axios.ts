import axios from "axios";
import qs from "qs";

import { components, paths } from "@/api/types/api";

export type ResponseBase = {
  statusCode: number;
};

export type ErrorResponseBase = {
  message: string;
  statusCode: number;
};

export type ApiResponse<N extends number, T> = T & { statusCode: N };

export type ResponseGetSchema<
  TPath extends string,
  TStatus extends number,
> = TPath extends keyof paths
  ? paths[TPath] extends {
      get: {
        responses: {
          [key in TStatus]: { content: { "application/json": infer TSchema } };
        };
      };
    }
    ? TSchema
    : never
  : never;

export type ResponsePostSchema<
  TPath extends string,
  TStatus extends number,
> = TPath extends keyof paths
  ? paths[TPath] extends {
      post: {
        responses: {
          [key in TStatus]: { content: { "application/json": infer TSchema } };
        };
      };
    }
    ? TSchema
    : never
  : never;

export type MakeGetResponse<
  TPath extends string,
  TStatus extends number,
> = ApiResponse<TStatus, ResponseGetSchema<TPath, TStatus>>;

export type ValidationError =
  components["schemas"]["ValidationErrorResponseDto"];

export type ValidationErrorItem =
  components["schemas"]["ValidationErrorItemDto"];

export class ApiError<T extends ErrorResponseBase> extends Error {
  constructor(public data: T) {
    super(data.message, {
      cause: data,
    });
  }
}

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:3000", // API URL
  withCredentials: true,
  paramsSerializer: (params) => {
    // Converts to ?studioIds=blue&studioIds=orange&studioIds=purple
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export default api;
