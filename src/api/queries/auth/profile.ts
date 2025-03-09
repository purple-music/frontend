import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { parseCookies } from "nookies";

import { paths } from "@/api/types/api";
import api, { ApiError } from "@/lib/axios";

type ProfileResponse =
  paths["/auth/profile"]["get"]["responses"]["200"]["content"]["application/json"];

const fetchProfile = async (): Promise<ProfileResponse> => {
  try {
    const cookies = parseCookies();
    const token = cookies.token;
    console.log("Foudn  a token", token);
    const res = await api.get("/auth/profile", {
      withCredentials: true,
    });
    console.log("res.data", res.data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.message || "Failed to fetch profile",
        error.status,
      );
    } else {
      throw error;
    }
  }
};

export const useProfileQuery = (
  options?: UseQueryOptions<ProfileResponse, ApiError>,
) => {
  console.log("useProfileQuery called");
  return useQuery<ProfileResponse, ApiError>({
    queryKey: ["profile"],
    enabled: true,
    queryFn: () => {
      console.log("useProfileQuery queryFn called");
      return fetchProfile();
    },
    ...options,
  });
};
