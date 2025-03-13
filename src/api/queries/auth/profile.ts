import { UseQueryOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, ApiResponse } from "@/lib/axios";

type Profile200Schema =
  paths["/auth/profile"]["get"]["responses"]["200"]["content"]["application/json"];
type Profile401Schema =
  paths["/auth/profile"]["get"]["responses"]["401"]["content"]["application/json"];

type ProfileResponse = ApiResponse<200, Profile200Schema>;
type ProfileErrorResponse = ApiResponse<401, Profile401Schema>;

export const useProfileQuery = (
  options?: UseQueryOptions<ProfileResponse, ApiError<ProfileErrorResponse>>,
) =>
  useGet<ProfileResponse, ProfileErrorResponse>(
    ["profile"],
    "/auth/profile",
    options,
  );
