import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, MakeGetResponse } from "@/lib/axios";

export type FreeSlot = components["schemas"]["FreeSlotDto"];

export type FreeSlotsResponse = MakeGetResponse<"/free-slots", 200>;
export type FreeSlotsErrorResponse =
  | MakeGetResponse<"/free-slots", 400>
  | MakeGetResponse<"/free-slots", 401>;

export type FreeSlotsFilters =
  paths["/free-slots"]["get"]["parameters"]["query"];

export const useFreeSlotsQuery = (
  filters?: FreeSlotsFilters,
  options?: UseQueryOptions<
    FreeSlotsResponse,
    ApiError<FreeSlotsErrorResponse>
  >,
) =>
  useGet<FreeSlotsResponse, FreeSlotsErrorResponse>(
    ["free-slots", filters],
    "/free-slots",
    filters,
    options,
  );
