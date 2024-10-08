"use client";

import React, { ReactNode } from "react";

import { AuthAlert } from "@/components/auth-card/AuthAlert";
import { AuthCard } from "@/components/auth-card/AuthCard";
import { AuthCardTitle } from "@/components/auth-card/AuthCardTitile";
import { AuthFooterAction } from "@/components/auth-card/AuthFooterAction";
import { AuthSocial } from "@/components/auth-card/AuthSocial";
import { useTranslation } from "@/i18n/client";
import { ActionResult } from "@/lib/types";

interface AuthFormProps {
  result: ActionResult | null;
  title: string;
  isSubmitting: boolean;
  buttonLabel: string;
  showSocial: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  extraAction?: { href: string; label: string };

  children: ReactNode;
}

export default function AuthForm({
  result,
  title,
  isSubmitting,
  buttonLabel,
  extraAction,
  onSubmit,
  children,
  showSocial,
}: AuthFormProps) {
  const { t } = useTranslation(undefined, "auth");

  return (
    <AuthCard>
      <AuthCardTitle title={title} />
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-stretch justify-center gap-2 pb-0"
      >
        {children}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full text-white"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading loading-dots loading-sm"></span>
          )}
          {buttonLabel}
        </button>
      </form>

      {/* General Message */}
      {result && <AuthAlert result={result} />}

      {showSocial && (
        <>
          <div className="divider my-0">{t("social.or")}</div>
          <AuthSocial />
        </>
      )}

      {extraAction && (
        <AuthFooterAction href={extraAction.href} label={extraAction.label} />
      )}
    </AuthCard>
  );
}
