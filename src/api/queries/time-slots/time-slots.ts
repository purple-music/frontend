import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, ApiResponse } from "@/lib/axios";

type TimeSlots200Schema =
  paths["/time-slots"]["get"]["responses"]["200"]["content"]["application/json"];
type TimeSlots400Schema =
  paths["/time-slots"]["get"]["responses"]["400"]["content"]["application/json"];
type TimeSlots401Schema =
  paths["/time-slots"]["get"]["responses"]["401"]["content"]["application/json"];

export type TimeSlot = components["schemas"]["TimeSlotDto"];

export type TimeSlotsResponse = ApiResponse<200, TimeSlots200Schema>;
export type TimeSlotsErrorResponse =
  | ApiResponse<400, TimeSlots400Schema>
  | ApiResponse<401, TimeSlots401Schema>;

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
