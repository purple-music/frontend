"use client";

import React, { ReactNode } from "react";
import { AuthAlert } from "@/components/auth-card/auth-alert";
import { AuthSocial } from "@/components/auth-card/auth-social";
import { AuthCardTitle } from "@/components/auth-card/auth-card-title";
import { AuthCard } from "@/components/auth-card/auth-card";
import { AuthFooterAction } from "@/components/auth-card/auth-footer-action";
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
          <div className="divider my-0">or</div>
          <AuthSocial />
        </>
      )}

      {extraAction && (
        <AuthFooterAction href={extraAction.href} label={extraAction.label} />
      )}
    </AuthCard>
  );
}
