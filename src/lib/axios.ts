import axios, { AxiosRequestConfig } from "axios";
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

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const REFRESH_ENDPOINT = "/api/auth/refresh" as const;
const LOGOUT_ENDPOINT = "/api/auth/logout" as const;

const api = axios.create({
  baseURL: BACKEND_URL || "http://localhost:3000", // API URL
  withCredentials: true, // Required for httpOnly cookies
  paramsSerializer: (params) => {
    // Converts to ?studioIds=blue&studioIds=orange&studioIds=purple
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

type QueueItem = {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

/**
 * If refresh fails, reject all pending requests with the error
 * Otherwise resolve them with anything,
 * because return value will be ignored and old query will be refetched
 */
const processQueue = (error?: any) => {
  failedQueue.forEach((promise) => {
    error ? promise.reject(error) : promise.resolve(undefined);
  });
  failedQueue = [];
};

type ApiPath = typeof REFRESH_ENDPOINT;

type Refresh200Schema =
  paths[ApiPath]["post"]["responses"]["200"]["content"]["application/json"];
type Refresh401Schema =
  paths[ApiPath]["post"]["responses"]["401"]["content"]["application/json"];

type RefreshResponse = ApiResponse<200, Refresh200Schema>;
type RefreshErrorResponse = ApiResponse<401, Refresh401Schema>;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryConfig;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post<RefreshResponse>(REFRESH_ENDPOINT); // Sets new tokens
        console.log("Refreshed tokens:", response.data);
        processQueue();
        return api(originalRequest); // Retry the request
      } catch (refreshError) {
        await api.post(LOGOUT_ENDPOINT);
        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;
