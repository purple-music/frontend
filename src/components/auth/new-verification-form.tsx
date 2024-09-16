"use client";

import { newVerification } from "@/actions/mutation/new-verification";
import { AuthAlert } from "@/components/auth-card/auth-alert";
import { AuthCard } from "@/components/auth-card/auth-card";
import { AuthCardTitle } from "@/components/auth-card/auth-card-title";
import { AuthFooterAction } from "@/components/auth-card/auth-footer-action";
import { useTranslation } from "@/i18n/client";
import { useAsyncAction } from "@/lib/hooks/useAsyncAction";
import { ActionResult } from "@/lib/types";
import { useSearchParams } from "next/navigation";

export default function NewVerificationForm() {
  const { t } = useTranslation(undefined, "auth");
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
