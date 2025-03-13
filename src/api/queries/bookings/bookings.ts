import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, ApiResponse } from "@/lib/axios";

type Bookings200Schema =
  paths["/bookings"]["get"]["responses"]["200"]["content"]["application/json"];
type Bookings400Schema =
  paths["/bookings"]["get"]["responses"]["400"]["content"]["application/json"];
type Bookings401Schema =
  paths["/bookings"]["get"]["responses"]["401"]["content"]["application/json"];

export type Booking = components["schemas"]["BookingDto"];

export type BookingsResponse = ApiResponse<200, Bookings200Schema>;
export type BookingsErrorResponse =
  | ApiResponse<400, Bookings400Schema>
  | ApiResponse<401, Bookings401Schema>;

export type BookingFilters = paths["/bookings"]["get"]["parameters"]["query"];

export const useBookingsQuery = (
  filters?: BookingFilters,
  options?: UseQueryOptions<BookingsResponse, ApiError<BookingsErrorResponse>>,
) =>
  useGet<BookingsResponse, BookingsErrorResponse>(
    ["bookings", filters],
    "/bookings",
    filters,
    options,
  );
