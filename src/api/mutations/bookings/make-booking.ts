import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

type MakeBookingRequest =
  paths["/bookings"]["post"]["requestBody"]["content"]["application/json"];

type MakeBooking201Schema =
  paths["/bookings"]["post"]["responses"]["201"]["content"]["application/json"];
type MakeBooking400Schema =
  paths["/bookings"]["post"]["responses"]["400"]["content"]["application/json"];
type MakeBooking401Schema =
  paths["/bookings"]["post"]["responses"]["401"]["content"]["application/json"];

type MakeBookingResponse = ApiResponse<200, MakeBooking201Schema>;
type MakeBookingErrorResponse =
  | ApiResponse<400, MakeBooking400Schema>
  | ApiResponse<401, MakeBooking401Schema>;

export const useMakeBookingMutation = (
  options?: UseMutationOptions<
    MakeBookingResponse,
    ApiError<MakeBookingErrorResponse>,
    MakeBookingRequest
  >,
) =>
  usePost<MakeBookingRequest, MakeBookingResponse, MakeBookingErrorResponse>(
    "/bookings",
    options,
  );
