import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError, ApiResponse } from "@/lib/axios";

type Logout200Schema =
  paths["/auth/logout"]["post"]["responses"]["200"]["content"]["application/json"];

type LogoutResponse = ApiResponse<200, Logout200Schema>;
type LogoutErrorResponse = never; // JWT logout does not return an error

const fetchLogout = async (): Promise<LogoutResponse> => {
  try {
    const res = await api.post<LogoutResponse>("/auth/logout");
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<LogoutErrorResponse>(error) && error.response) {
      throw new ApiError<LogoutErrorResponse>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useLogoutMutation = (
  options?: UseMutationOptions<
    LogoutResponse,
    ApiError<LogoutErrorResponse>,
    void
  >,
) => {
  return useMutation({
    mutationFn: fetchLogout,
    ...options,
  });
};
