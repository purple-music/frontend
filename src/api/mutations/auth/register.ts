import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import { paths } from "@/api/types/api";
import api, { ApiError, ApiResponse } from "@/lib/axios";

type RegisterRequest =
  paths["/auth/register"]["post"]["requestBody"]["content"]["application/json"];

type Register201Schema =
  paths["/auth/register"]["post"]["responses"]["201"]["content"]["application/json"];
type Register400Schema =
  paths["/auth/register"]["post"]["responses"]["400"]["content"]["application/json"];

type RegisterResponse = ApiResponse<201, Register201Schema>;
type RegisterErrorResponse = ApiResponse<400, Register400Schema>;

const fetchRegister = async (
  data: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const res = await api.post<RegisterResponse>("/auth/register", data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<RegisterErrorResponse>(error) && error.response) {
      throw new ApiError<RegisterErrorResponse>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useRegisterMutation = (
  options?: UseMutationOptions<
    RegisterResponse,
    ApiError<RegisterErrorResponse>,
    RegisterRequest
  >,
) => {
  return useMutation({
    mutationFn: fetchRegister,
    ...options,
  });
};
