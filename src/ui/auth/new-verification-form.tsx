"use client";

import { newVerification } from "@/actions/mutation/new-verification";
import { AuthCard } from "@/ui/auth-card/auth-card";
import { AuthCardTitle } from "@/ui/auth-card/auth-card-title";
import { AuthErrorAlert } from "@/ui/auth-card/auth-error-alert";
import { AuthFooterAction } from "@/ui/auth-card/auth-footer-action";
import { AuthSuccessAlert } from "@/ui/auth-card/auth-success-alert";
import { InputField } from "@/ui/auth/input-field";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.generalError);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    // TODO: use AuthForm instead of AuthCard
    <AuthCard>
      <AuthCardTitle title={"Confirming your email..."} />

      {!success && !error && (
        <div className="flex flex-row items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      <AuthSuccessAlert message={success} />
      <AuthErrorAlert message={error} />

      <AuthFooterAction href={"/auth/login"} label={"Back to login!"} />
    </AuthCard>
  );
}
