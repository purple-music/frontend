import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, ApiResponse } from "@/lib/axios";

type Prices200Schema =
  paths["/bookings/prices"]["get"]["responses"]["200"]["content"]["application/json"];
type Prices400Schema =
  paths["/bookings/prices"]["get"]["responses"]["400"]["content"]["application/json"];
type Prices401Schema =
  paths["/bookings/prices"]["get"]["responses"]["401"]["content"]["application/json"];

export type PricedTimeSlot = components["schemas"]["PricedTimeSlotDto"];

export type PricesResponse = ApiResponse<200, Prices200Schema>;
export type PricesErrorResponse =
  | ApiResponse<400, Prices400Schema>
  | ApiResponse<401, Prices401Schema>;

export type PricesFilters =
  paths["/bookings/prices/{studioId}"]["get"]["parameters"]["query"];

export type Prices = PricesResponse;
export type StudioPrices = components["schemas"]["PricedTimeSlotDto"][];

export const usePricesQuery = (
  filters: PricesFilters, // Important: filters are required
  options?: UseQueryOptions<PricesResponse, ApiError<PricesErrorResponse>>,
) =>
  useGet<PricesResponse, PricesErrorResponse>(
    ["bookings/prices", filters],
    "/bookings/prices",
    filters,
    options,
  );
