import { UseQueryOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, ApiResponse } from "@/lib/axios";

const PATH = "/api/auth/profile" as const;
type ApiPath = typeof PATH;

type Profile200Schema =
  paths[ApiPath]["get"]["responses"]["200"]["content"]["application/json"];
type Profile401Schema =
  paths[ApiPath]["get"]["responses"]["401"]["content"]["application/json"];

export type ProfileResponse = ApiResponse<200, Profile200Schema>;
export type ProfileErrorResponse = ApiResponse<401, Profile401Schema>;

export const useProfileQuery = (
  options?: UseQueryOptions<ProfileResponse, ApiError<ProfileErrorResponse>>,
) => useGet<ProfileResponse, ProfileErrorResponse>([PATH], PATH, options);
