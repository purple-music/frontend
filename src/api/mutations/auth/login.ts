import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError, ApiResponse } from "@/lib/axios";

type LoginRequest =
  paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];

type Login200Schema =
  paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];
type Login400Schema =
  paths["/auth/login"]["post"]["responses"]["400"]["content"]["application/json"];
type Login401Schema =
  paths["/auth/login"]["post"]["responses"]["401"]["content"]["application/json"];

type LoginResponse = ApiResponse<200, Login200Schema>;
type LoginErrorResponse =
  | ApiResponse<400, Login400Schema>
  | ApiResponse<401, Login401Schema>;

const fetchLogin = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const res = await api.post<LoginResponse>("/auth/login", data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<LoginErrorResponse>(error) && error.response) {
      throw new ApiError<LoginErrorResponse>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useLoginMutation = (
  options: UseMutationOptions<
    LoginResponse,
    ApiError<LoginErrorResponse>,
    LoginRequest
  >,
) => {
  return useMutation({
    mutationFn: fetchLogin,
    ...options,
  });
};
