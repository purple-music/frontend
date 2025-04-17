import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

const PATH = "/api/auth/register" as const;
type ApiPath = typeof PATH;

type RegisterRequest =
  paths[ApiPath]["post"]["requestBody"]["content"]["application/json"];

type Register201Schema =
  paths[ApiPath]["post"]["responses"]["201"]["content"]["application/json"];
type Register400Schema =
  paths[ApiPath]["post"]["responses"]["400"]["content"]["application/json"];

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
    PATH,
    options,
  );
