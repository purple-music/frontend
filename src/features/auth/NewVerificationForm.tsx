"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AuthAlert } from "@/features/auth/auth-card/AuthAlert";
import { AuthCard } from "@/features/auth/auth-card/AuthCard";
import { AuthCardTitle } from "@/features/auth/auth-card/AuthCardTitile";
import { AuthFooterAction } from "@/features/auth/auth-card/AuthFooterAction";
import { verify } from "@/lib/auth";
import { ActionResult } from "@/lib/types";

export default function NewVerificationForm() {
  const { t } = useTranslation("auth");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [result, setResult] = useState<ActionResult | null>(null);

  useEffect(() => {
    // If search params don't have token, show error
    if (!token) {
      setResult({
        type: "error",
        message: t("new-verification.error.missing-token"),
      });
      return;
    }

    // Search params have token, update result
    verify(token)
      .then(setResult)
      .catch(() => {
        setResult({ type: "error", message: "Unexpected error occurred!" });
      });
  }, [t, token]);

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
