"use client";

import { TbLock } from "react-icons/tb";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { NewPasswordSchema } from "@/schemas/schemas";
import { AuthInputField } from "@/components/auth-card/auth-input-field";
import AuthForm from "@/components/auth/auth-form";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/mutation/new-password";

export function NewPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    NewPasswordSchema,
    async (data) => await newPassword(data, token),
  );

  return (
    <AuthForm
      result={result}
      title="Enter a new password"
      isSubmitting={isSubmitting}
      buttonLabel={
        isSubmitting ? "Updating your password..." : "Update my password!"
      }
      showSocial={false}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/login",
        label: "Remembered the password? Back to login!",
      }}
    >
      {/* Password Field */}
      <AuthInputField
        type="password"
        label="New password"
        placeholder="******"
        register={form.register("password")}
        disabled={isSubmitting}
        error={form.formState.errors.password?.message}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
