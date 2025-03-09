import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError } from "@/lib/axios";

type LoginResponse =
  paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];

const fetchLogin = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(error.message || "Login failed", error.status);
    } else {
      throw error;
    }
  }
};

export const useLoginMutation = (
  options: UseMutationOptions<
    LoginResponse,
    ApiError,
    {
      email: string;
      password: string;
    },
    unknown
  >,
) => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      fetchLogin(email, password),
    ...options,
  });
};
