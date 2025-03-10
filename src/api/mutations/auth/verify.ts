import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError, ApiResponse } from "@/lib/axios";

type VerifyRequest =
  paths["/auth/verify"]["post"]["requestBody"]["content"]["application/json"];

type Verify201Schema =
  paths["/auth/verify"]["post"]["responses"]["201"]["content"]["application/json"];
type Verify400Schema =
  paths["/auth/verify"]["post"]["responses"]["400"]["content"]["application/json"];

type VerifyResponse = ApiResponse<200, Verify201Schema>;
type VerifyErrorResponse = ApiResponse<400, Verify400Schema>;

const fetchVerify = async (data: VerifyRequest): Promise<VerifyResponse> => {
  try {
    const res = await api.post<VerifyResponse>("/auth/verify", data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<VerifyErrorResponse>(error) && error.response) {
      throw new ApiError<VerifyErrorResponse>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useVerifyMutation = (
  options?: UseMutationOptions<
    VerifyResponse,
    ApiError<VerifyErrorResponse>,
    VerifyRequest
  >,
) => {
  return useMutation({
    mutationFn: fetchVerify,
    ...options,
  });
};
