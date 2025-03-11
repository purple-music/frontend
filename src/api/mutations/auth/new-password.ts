import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError, ApiResponse } from "@/lib/axios";

type NewPasswordRequest =
  paths["/auth/new-password"]["post"]["requestBody"]["content"]["application/json"];

type NewPassword201Schema =
  paths["/auth/new-password"]["post"]["responses"]["201"]["content"]["application/json"];
type NewPassword400Schema =
  paths["/auth/new-password"]["post"]["responses"]["400"]["content"]["application/json"];

type NewPasswordResponse = ApiResponse<201, NewPassword201Schema>;
type NewPasswordErrorResponse = ApiResponse<400, NewPassword400Schema>;

const fetchNewPassword = async (
  data: NewPasswordRequest,
): Promise<NewPasswordResponse> => {
  try {
    const res = await api.post<NewPasswordResponse>("/auth/new-password", data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<NewPasswordErrorResponse>(error) && error.response) {
      throw new ApiError<NewPasswordErrorResponse>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useNewPasswordMutation = (
  options?: UseMutationOptions<
    NewPasswordResponse,
    ApiError<NewPasswordErrorResponse>,
    NewPasswordRequest
  >,
) => {
  return useMutation({
    mutationFn: fetchNewPassword,
    ...options,
  });
};
