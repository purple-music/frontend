import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

const PATH = "/api/auth/logout" as const;
type ApiPath = typeof PATH;

type Logout200Schema =
  paths[ApiPath]["post"]["responses"]["200"]["content"]["application/json"];

type LogoutResponse = ApiResponse<200, Logout200Schema>;
type LogoutErrorResponse = never; // JWT logout does not return an error

export const useLogoutMutation = (
  options?: UseMutationOptions<
    LogoutResponse,
    ApiError<LogoutErrorResponse>,
    void
  >,
) => usePost<void, LogoutResponse, LogoutErrorResponse>(PATH, options);
