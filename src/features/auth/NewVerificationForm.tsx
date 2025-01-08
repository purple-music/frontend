"use client";

import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { newVerification } from "@/actions/mutation/new-verification";
import { AuthAlert } from "@/features/auth/auth-card/AuthAlert";
import { AuthCard } from "@/features/auth/auth-card/AuthCard";
import { AuthCardTitle } from "@/features/auth/auth-card/AuthCardTitile";
import { AuthFooterAction } from "@/features/auth/auth-card/AuthFooterAction";
import { useAsyncAction } from "@/lib/hooks/useAsyncAction";
import { ActionResult } from "@/lib/types";

export default function NewVerificationForm() {
  const { t } = useTranslation("auth");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { result } = useAsyncAction(async (): Promise<ActionResult> => {
    if (!token) {
      return {
        type: "error",
        message: t("new-verification.error.missing-token"),
      };
    }
    return await newVerification(token);
  }, [token]);

  return (
    <AuthCard>
      <AuthCardTitle title={t("new-verification.title")} />

      {result ? (
        <AuthAlert result={result} />
      ) : (
        <div className="flex flex-row items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <AuthFooterAction
        href={"/auth/login"}
        label={t("new-verification.extra-action")}
      />
    </AuthCard>
  );
}
