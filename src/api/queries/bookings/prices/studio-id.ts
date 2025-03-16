import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, ApiResponse } from "@/lib/axios";

type PricesStudio200Schema =
  paths["/bookings/prices/{studioId}"]["get"]["responses"]["200"]["content"]["application/json"];
type PricesStudio400Schema =
  paths["/bookings/prices/{studioId}"]["get"]["responses"]["400"]["content"]["application/json"];
type PricesStudio401Schema =
  paths["/bookings/prices/{studioId}"]["get"]["responses"]["401"]["content"]["application/json"];

export type PricedTimeSlot = components["schemas"]["PricedTimeSlotDto"];

export type PricesStudioResponse = ApiResponse<200, PricesStudio200Schema>;
export type PricesStudioErrorResponse =
  | ApiResponse<400, PricesStudio400Schema>
  | ApiResponse<401, PricesStudio401Schema>;

export type PricesStudioFilters =
  paths["/bookings/prices/{studioId}"]["get"]["parameters"]["query"];
export type StudioId =
  paths["/bookings/prices/{studioId}"]["get"]["parameters"]["path"];

export const usePricesStudioQuery = (
  filters: PricesStudioFilters, // Important: filters are required
  studioId: StudioId,
  options?: UseQueryOptions<
    PricesStudioResponse,
    ApiError<PricesStudioErrorResponse>
  >,
) =>
  useGet<PricesStudioResponse, PricesStudioErrorResponse>(
    ["bookings/prices/{studioId}", filters, studioId],
    "/bookings/prices/{studioId}",
    filters,
    options,
  );
