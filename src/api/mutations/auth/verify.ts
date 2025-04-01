import { UseMutationOptions } from "@tanstack/react-query";

import { paths } from "@/api/types/api";
import usePost from "@/api/use-post";
import { ApiError, ApiResponse } from "@/lib/axios";

type VerifyRequest =
  paths["/auth/verify"]["post"]["requestBody"]["content"]["application/json"];

type Verify201Schema =
  paths["/auth/verify"]["post"]["responses"]["201"]["content"]["application/json"];
type Verify400Schema =
  paths["/auth/verify"]["post"]["responses"]["400"]["content"]["application/json"];

type VerifyResponse = ApiResponse<200, Verify201Schema>;
type VerifyErrorResponse = ApiResponse<400, Verify400Schema>;

export const useVerifyMutation = (
  options?: UseMutationOptions<
    VerifyResponse,
    ApiError<VerifyErrorResponse>,
    VerifyRequest
  >,
) =>
  usePost<VerifyRequest, VerifyResponse, VerifyErrorResponse>(
    "/auth/verify",
    options,
  );
