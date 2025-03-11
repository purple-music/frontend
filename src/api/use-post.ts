import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

import api, { ApiError, ErrorResponseBase, ResponseBase } from "@/lib/axios";

const fetchPost = async <
  TRequest,
  TResponse extends ResponseBase,
  TError extends ErrorResponseBase,
>(
  url: string,
  data: TRequest,
) => {
  try {
    const res = await api.post<TResponse>(url, data);
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<TError>(error) && error.response) {
      throw new ApiError<TError>(error.response.data);
    } else {
      throw error;
    }
  }
};

const usePost = <
  TRequest,
  TResponse extends ResponseBase,
  TError extends ErrorResponseBase,
>(
  url: string,
  options?: UseMutationOptions<TResponse, ApiError<TError>, TRequest>,
) => {
  return useMutation({
    mutationFn: (data: TRequest) =>
      fetchPost<TRequest, TResponse, TError>(url, data),
    ...options,
  });
};

export default usePost;
