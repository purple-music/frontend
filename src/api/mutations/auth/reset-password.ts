import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError, ApiResponse } from "@/lib/axios";

type ResetPasswordRequest =
  paths["/auth/reset-password"]["post"]["requestBody"]["content"]["application/json"];

type ResetPassword201Schema =
  paths["/auth/reset-password"]["post"]["responses"]["201"]["content"]["application/json"];
type ResetPassword400Schema =
  paths["/auth/reset-password"]["post"]["responses"]["400"]["content"]["application/json"];

type ResetPasswordResponse = ApiResponse<201, ResetPassword201Schema>;
type ResetPasswordErrorResponse = ApiResponse<400, ResetPassword400Schema>;

const fetchResetPassword = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  try {
    const res = await api.post<ResetPasswordResponse>(
      "/auth/reset-password",
      data,
    );
    return res.data;
  } catch (error: any) {
    if (
      axios.isAxiosError<ResetPasswordErrorResponse>(error) &&
      error.response
    ) {
      throw new ApiError<ResetPasswordErrorResponse>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useResetPasswordMutation = (
  options?: UseMutationOptions<
    ResetPasswordResponse,
    ApiError<ResetPasswordErrorResponse>,
    ResetPasswordRequest
  >,
) => {
  return useMutation({
    mutationFn: fetchResetPassword,
    ...options,
  });
};
