"use client";

import React, { ReactNode } from "react";
import { ErrorAlert } from "@/ui/auth/error-alert";
import { Social } from "@/ui/auth-card/social";
import { AuthCardTitle } from "@/ui/auth-card/auth-card-title";
import { AuthCard } from "@/ui/auth-card/auth-card";
import { AuthFooterAction } from "@/ui/auth-card/auth-footer-action";
import { SuccessAlert } from "@/ui/auth/success-alert";

interface AuthFormProps {
  action: (payload: FormData) => void;
  generalError?: string;
  success?: string;
  title: string;
  isPending: boolean;
  buttonLabel: string;

  extraActionLabel: string;
  extraActionHref: string;

  children: ReactNode;
}

export default function AuthForm({
  action,
  generalError,
  success,
  title,
  isPending,
  buttonLabel,
  extraActionHref,
  extraActionLabel,
  children,
}: AuthFormProps) {
  return (
    <AuthCard>
      <AuthCardTitle title={title} />
      <form
        action={action}
        className="flex flex-col items-stretch justify-center gap-2 pb-0"
      >
        {children}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full text-white"
          disabled={isPending}
        >
          {buttonLabel}
        </button>

        {/* General Message */}
        <ErrorAlert message={generalError} />
        <SuccessAlert message={success} />
      </form>

      <div className="divider my-0">or</div>

      <Social />
      <AuthFooterAction href={extraActionHref} label={extraActionLabel} />
    </AuthCard>
  );
}
