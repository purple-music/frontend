"use client";

import { useTranslation } from "react-i18next";
import { FaExclamationTriangle } from "react-icons/fa";

import { AuthCard } from "@/components/auth-card/AuthCard";
import { AuthCardTitle } from "@/components/auth-card/AuthCardTitile";
import { AuthFooterAction } from "@/components/auth-card/AuthFooterAction";

export function ErrorCard() {
  const { t } = useTranslation("auth");
  return (
    <AuthCard>
      <AuthCardTitle title={"Error!"} />
      <p>{t("error.message")}</p>
      <div className="flex w-full items-center justify-center">
        <FaExclamationTriangle />
      </div>
      <AuthFooterAction href="/auth/login" label="Go back to login page" />
    </AuthCard>
  );
}
