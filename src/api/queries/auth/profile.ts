import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError, ApiResponse } from "@/lib/axios";

type ProfileSuccessSchema =
  paths["/auth/profile"]["get"]["responses"]["200"]["content"]["application/json"];
type Profile401Schema =
  paths["/auth/profile"]["get"]["responses"]["401"]["content"]["application/json"];

type ProfileResponse = ApiResponse<200, ProfileSuccessSchema>;
type ProfileErrorResponse = ApiResponse<401, Profile401Schema>;

const fetchProfile = async (): Promise<ProfileResponse> => {
  try {
    const res = await api.get<ProfileResponse>("/auth/profile", {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<ProfileErrorResponse>(error) && error.response) {
      throw new ApiError<ProfileErrorResponse>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useProfileQuery = (
  options?: UseQueryOptions<ProfileResponse, ApiError<ProfileErrorResponse>>,
) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    ...options,
  });
};
