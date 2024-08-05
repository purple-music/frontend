"use client";

import React, { ReactNode } from "react";
import { ErrorAlert } from "@/ui/auth/error-alert";
import { CreateAccount } from "@/ui/auth/create-account";
import { Social } from "@/ui/auth/social";

interface AuthFormProps {
  action: (payload: FormData) => void;
  message?: string;
  title: string;
  isPending: boolean;
  buttonLabel: string;

  extraActionLabel: string;
  extraActionHref: string;

  children: ReactNode;
}

export default function AuthForm({
  action,
  message,
  title,
  isPending,
  buttonLabel,
  extraActionHref,
  extraActionLabel,
  children,
}: AuthFormProps) {
  return (
    <form action={action} className="card max-w-sm bg-base-100">
      <section className="card-body">
        <h1 className="card-title mb-4 text-2xl">{title}</h1>

        {children}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full rounded px-4 py-2 text-white"
          disabled={isPending}
        >
          {buttonLabel}
        </button>

        {/* General Message */}
        <ErrorAlert message={message} />

        <div className="divider">or</div>

        <Social />
        <CreateAccount href={extraActionHref} label={extraActionLabel} />
      </section>
    </form>
  );
}
