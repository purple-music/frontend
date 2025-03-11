import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

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

export const useLoginMutation = (
  options?: UseMutationOptions<
    LoginResponse,
    ApiError<LoginErrorResponse>,
    LoginRequest
  >,
) =>
  usePost<LoginRequest, LoginResponse, LoginErrorResponse>(
    "/auth/login",
    options,
  );
