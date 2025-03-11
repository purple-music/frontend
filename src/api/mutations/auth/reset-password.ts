import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

type ResetPasswordRequest =
  paths["/auth/reset-password"]["post"]["requestBody"]["content"]["application/json"];

type ResetPassword201Schema =
  paths["/auth/reset-password"]["post"]["responses"]["201"]["content"]["application/json"];
type ResetPassword400Schema =
  paths["/auth/reset-password"]["post"]["responses"]["400"]["content"]["application/json"];

type ResetPasswordResponse = ApiResponse<201, ResetPassword201Schema>;
type ResetPasswordErrorResponse = ApiResponse<400, ResetPassword400Schema>;

export const useResetPasswordMutation = (
  options?: UseMutationOptions<
    ResetPasswordResponse,
    ApiError<ResetPasswordErrorResponse>,
    ResetPasswordRequest
  >,
) =>
  usePost<
    ResetPasswordRequest,
    ResetPasswordResponse,
    ResetPasswordErrorResponse
  >("/auth/reset-password", options);
