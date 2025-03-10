"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useVerifyMutation } from "@/api/mutations/auth/verify";
import { AuthAlert } from "@/features/auth/auth-card/AuthAlert";
import { AuthCard } from "@/features/auth/auth-card/AuthCard";
import { AuthCardTitle } from "@/features/auth/auth-card/AuthCardTitile";
import { AuthFooterAction } from "@/features/auth/auth-card/AuthFooterAction";

export default function NewVerificationForm() {
  const { t } = useTranslation("auth");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { mutate, data, isPending, isError, error, isSuccess } =
    useVerifyMutation();

  let message: string | null = null;
  if (isPending) message = t("new-verification.pending");
  if (isError) message = error.data.message;
  if (data) message = t("new-verification.success");
  if (!message) message = t("new-verification.error");

  useEffect(() => {
    if (token) mutate({ token });
  }, [mutate, token]);

  return (
    <AuthCard>
      <AuthCardTitle title={t("new-verification.title")} />

      {isPending ? (
        <div className="flex flex-row items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <AuthAlert message={message} isSuccess={isSuccess} />
      )}

      <AuthFooterAction
        href={"/auth/login"}
        label={t("new-verification.extra-action")}
      />
    </AuthCard>
  );
}
