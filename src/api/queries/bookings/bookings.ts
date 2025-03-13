import { UseQueryOptions } from "@tanstack/react-query";

import { components, paths } from "@/api/types/api";
import useGet from "@/api/use-get";
import { ApiError, ApiResponse } from "@/lib/axios";

type Bookings200Schema =
  paths["/bookings"]["get"]["responses"]["200"]["content"]["application/json"];
type Bookings401Schema =
  paths["/bookings"]["get"]["responses"]["401"]["content"]["application/json"];

export type Booking = components["schemas"]["BookingDto"];

type BookingsResponse = ApiResponse<200, Bookings200Schema>;
type BookingsErrorResponse = ApiResponse<401, Bookings401Schema>;

type BookingFilters = paths["/bookings"]["get"]["parameters"]["query"];

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
