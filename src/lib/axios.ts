import axios from "axios";

import { components } from "@/api/types/api";

export type ResponseBase = {
  statusCode: number;
};

export type ErrorResponseBase = {
  message: string;
  statusCode: number;
};

export type ApiResponse<N extends number, T> = T & { statusCode: N };

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
});

export default api;
