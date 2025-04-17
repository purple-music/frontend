import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, MakeGetResponse } from "@/lib/axios";

const PATH = "/api/time-slots" as const;
type ApiPath = typeof PATH;

export type TimeSlot = components["schemas"]["TimeSlotDto"];

export type TimeSlotsResponse = MakeGetResponse<ApiPath, 200>;
export type TimeSlotsErrorResponse =
  | MakeGetResponse<ApiPath, 400>
  | MakeGetResponse<ApiPath, 401>;

export type TimeSlotFilters = paths[ApiPath]["get"]["parameters"]["query"];

export const useTimeSlotsQuery = (
  filters?: TimeSlotFilters,
  options?: UseQueryOptions<
    TimeSlotsResponse,
    ApiError<TimeSlotsErrorResponse>
  >,
) =>
  useGet<TimeSlotsResponse, TimeSlotsErrorResponse>(
    [PATH, filters],
    PATH,
    filters,
    options,
  );
