"use client";

import { resetPassword } from "@/actions/mutation/reset";
import { TbMail } from "react-icons/tb";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { ResetSchema } from "@/schemas/schemas";
import { AuthInputField } from "@/components/auth-card/auth-input-field";
import AuthForm from "@/components/auth/auth-form";

export function ResetForm() {
  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    ResetSchema,
    resetPassword,
  );

  return (
    <AuthForm
      result={result}
      title="Forgot your password?"
      isSubmitting={isSubmitting}
      buttonLabel="Send reset email!"
      showSocial={false}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/register",
        label: "Don't have an account? Register now!",
      }}
    >
      {/* Email Field */}
      <AuthInputField
        type="email"
        label="Email"
        register={form.register("email")}
        placeholder="john@email.com"
        error={form.formState.errors.email?.message}
        disabled={isSubmitting}
        icon={<TbMail />}
      />
    </AuthForm>
  );
}
