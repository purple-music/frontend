import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

type RegisterRequest =
  paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"];

type Register201Schema =
  paths["/auth/register"]["post"]["responses"]["201"]["content"]["application/json"];
type Register400Schema =
  paths["/auth/register"]["post"]["responses"]["400"]["content"]["application/json"];

type RegisterResponse = ApiResponse<201, Register201Schema>;
type RegisterErrorResponse = ApiResponse<400, Register400Schema>;

export const useRegisterMutation = (
  options?: UseMutationOptions<
    RegisterResponse,
    ApiError<RegisterErrorResponse>,
    RegisterRequest
  >,
) =>
  usePost<RegisterRequest, RegisterResponse, RegisterErrorResponse>(
    "/auth/register",
    options,
  );
