import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

import api, { ApiError, ErrorResponseBase, ResponseBase } from "@/lib/axios";

type QueryParams = Record<string, any>;

const fetchGet = async <
  TResponse extends ResponseBase,
  TError extends ErrorResponseBase,
>(
  url: string,
  params?: QueryParams,
): Promise<TResponse> => {
  try {
    const res = await api.get<TResponse>(url, {
      withCredentials: true,
      params,
    });
    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError<TError>(error) && error.response) {
      throw new ApiError<TError>(error.response.data);
    } else {
      throw error;
    }
  }
};

export const useGet = <
  TResponse extends ResponseBase,
  TError extends ErrorResponseBase,
>(
  queryKey: unknown[],
  url: string,
  params?: QueryParams,
  options?: UseQueryOptions<TResponse, ApiError<TError>>,
) => {
  return useQuery({
    queryKey,
    queryFn: () => fetchGet<TResponse, TError>(url, params),
    ...options,
  });
};

export default useGet;
