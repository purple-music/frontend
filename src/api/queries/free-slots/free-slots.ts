import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, MakeGetResponse } from "@/lib/axios";

const PATH = "/api/free-slots" as const;
type ApiPath = typeof PATH;

export type FreeSlot = components["schemas"]["FreeSlotDto"];

export type FreeSlotsResponse = MakeGetResponse<ApiPath, 200>;
export type FreeSlotsErrorResponse =
  | MakeGetResponse<ApiPath, 400>
  | MakeGetResponse<ApiPath, 401>;

export type FreeSlotsFilters = paths[ApiPath]["get"]["parameters"]["query"];

export const useFreeSlotsQuery = (
  filters?: FreeSlotsFilters,
  options?: UseQueryOptions<
    FreeSlotsResponse,
    ApiError<FreeSlotsErrorResponse>
  >,
) =>
  useGet<FreeSlotsResponse, FreeSlotsErrorResponse>(
    [PATH, filters],
    PATH,
    filters,
    options,
  );
