import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

const PATH = "/api/auth/new-password" as const;
type ApiPath = typeof PATH;

type NewPasswordRequest =
  paths[ApiPath]["post"]["requestBody"]["content"]["application/json"];

type NewPassword201Schema =
  paths[ApiPath]["post"]["responses"]["201"]["content"]["application/json"];
type NewPassword400Schema =
  paths[ApiPath]["post"]["responses"]["400"]["content"]["application/json"];

type NewPasswordResponse = ApiResponse<201, NewPassword201Schema>;
type NewPasswordErrorResponse = ApiResponse<400, NewPassword400Schema>;

export const useNewPasswordMutation = (
  options?: UseMutationOptions<
    NewPasswordResponse,
    ApiError<NewPasswordErrorResponse>,
    NewPasswordRequest
  >,
) =>
  usePost<NewPasswordRequest, NewPasswordResponse, NewPasswordErrorResponse>(
    PATH,
    options,
  );
