import axios from "axios";

export class ApiError extends Error {
  public message: string;
  public status?: number;

  constructor(message: string, status?: number) {
    super(message, { cause: status });
    this.message = message;
    this.status = status;
  }
}

const api = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:3000", // API URL
  withCredentials: true,
});

export default api;
