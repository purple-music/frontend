import axios, { AxiosError } from "axios";

import api, { ApiError } from "./axios";

export const register = async (
  email: string,
  password: string,
  name: string,
) => {
  const res = await api.post<any>("/auth/register", {
    email,
    password,
    name,
  });
  return res.data;
};

export const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      // Convert to standardized error format
      throw new ApiError(error.message || "Login failed", error.status);
    } else {
      throw error;
    }
  }
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const fetchUser = async () => {
  const res = await api.get("/profile");
  return res.data;
};

export const verify = async (token: string) => {
  try {
    const res = await api.post("/auth/verify", { token });
    return res.data;
  } catch (error) {
    // Check if it's an Axios error
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";

      // Handle specific status codes
      switch (status) {
        case 400:
          throw new Error(`Bad Request: ${errorMessage}`);
        case 401:
          throw new Error(`Unauthorized: ${errorMessage}`);
        case 404:
          throw new Error(`Not Found: ${errorMessage}`);
        case 500:
          throw new Error(`Server Error: ${errorMessage}`);
        default:
          throw new Error(`HTTP Error: ${errorMessage}`);
      }
    } else {
      // Handle non-Axios errors (e.g., network errors)
      throw new Error("An unexpected error occurred");
    }
  }
};
