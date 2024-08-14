"use client";

import { resetPassword } from "@/actions/mutation/reset";
import { AuthCard } from "@/components/auth-card/auth-card";
import { AuthCardTitle } from "@/components/auth-card/auth-card-title";
import { AuthErrorAlert } from "@/components/auth-card/auth-error-alert";
import { AuthFooterAction } from "@/components/auth-card/auth-footer-action";
import { AuthSuccessAlert } from "@/components/auth-card/auth-success-alert";
import { InputField } from "@/components/auth/input-field";
import { useFormState } from "react-dom";
import { TbMail } from "react-icons/tb";

export function ResetForm() {
  const [state, action, isPending] = useFormState(resetPassword, {}); // TODO: replace with startTransition

  return (
    <AuthCard>
      <AuthCardTitle title={"Forgot your password?"} />

      <form
        action={action}
        className="flex flex-col items-stretch justify-center gap-2 pb-0"
      >
        {/* Email Field */}
        <InputField
          type="email"
          label="Email"
          name="email"
          placeholder="john@email.com"
          errorMessages={state.errors?.email}
          disabled={isPending}
          icon={<TbMail />}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full text-white"
          disabled={isPending}
        >
          {"Send reset email!"}
        </button>

        {/* General Message */}
        <AuthErrorAlert message={state.generalError} />
        <AuthSuccessAlert message={state.success} />
      </form>

      <AuthFooterAction
        href={"/auth/register"}
        label={"Don't have an account? Register now!"}
      />
    </AuthCard>
  );
}
