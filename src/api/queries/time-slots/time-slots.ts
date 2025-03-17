import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, MakeGetResponse } from "@/lib/axios";

export type TimeSlot = components["schemas"]["TimeSlotDto"];

export type TimeSlotsResponse = MakeGetResponse<"/time-slots", 200>;
export type TimeSlotsErrorResponse =
  | MakeGetResponse<"/time-slots", 400>
  | MakeGetResponse<"/time-slots", 401>;

export type TimeSlotFilters =
  paths["/time-slots"]["get"]["parameters"]["query"];

export const useTimeSlotsQuery = (
  filters?: TimeSlotFilters,
  options?: UseQueryOptions<
    TimeSlotsResponse,
    ApiError<TimeSlotsErrorResponse>
  >,
) =>
  useGet<TimeSlotsResponse, TimeSlotsErrorResponse>(
    ["time-slots", filters],
    "/time-slots",
    filters,
    options,
  );
