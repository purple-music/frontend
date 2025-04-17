import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

const PATH = "/api/auth/login-telegram" as const;
type ApiPath = typeof PATH;

type LoginRequest =
  paths[ApiPath]["post"]["requestBody"]["content"]["application/json"];

type Login200Schema =
  paths[ApiPath]["post"]["responses"]["200"]["content"]["application/json"];
type Login401Schema =
  paths[ApiPath]["post"]["responses"]["401"]["content"]["application/json"];

type LoginResponse = ApiResponse<200, Login200Schema>;
type LoginErrorResponse = ApiResponse<401, Login401Schema>;

export const useLoginTelegramMutation = (
  options?: UseMutationOptions<
    LoginResponse,
    ApiError<LoginErrorResponse>,
    LoginRequest
  >,
) => usePost<LoginRequest, LoginResponse, LoginErrorResponse>(PATH, options);

export default useLoginTelegramMutation;
