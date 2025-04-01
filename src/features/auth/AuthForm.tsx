"use client";

import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { AuthAlert } from "@/features/auth/auth-card/AuthAlert";
import { AuthCard } from "@/features/auth/auth-card/AuthCard";
import { AuthCardTitle } from "@/features/auth/auth-card/AuthCardTitile";
import { AuthFooterAction } from "@/features/auth/auth-card/AuthFooterAction";
import { AuthSocial } from "@/features/auth/auth-card/AuthSocial";

interface AuthFormProps {
  resultMessage: string | null;
  resultIsSuccess: boolean;
  title: string;
  isSubmitting: boolean;
  buttonLabel: string;
  showSocial: boolean;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  extraAction?: { href: string; label: string };

  children: ReactNode;
}

export default function AuthForm({
  resultMessage,
  resultIsSuccess,
  title,
  isSubmitting,
  buttonLabel,
  extraAction,
  onSubmit,
  children,
  showSocial,
}: AuthFormProps) {
  const { t } = useTranslation("auth");

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
      {resultMessage && (
        <AuthAlert message={resultMessage} isSuccess={resultIsSuccess} />
      )}

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
