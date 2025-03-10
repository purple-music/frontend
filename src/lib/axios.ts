import axios from "axios";

export type ResponseBase = {
  message: string;
  statusCode: number;
};

export type ApiResponse<N extends number, T> = T & { statusCode: N };

export class ApiError<T extends ResponseBase> extends Error {
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
