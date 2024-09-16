"use client";

import { TbLock } from "react-icons/tb";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { NewPasswordSchema } from "@/schemas/schemas";
import { AuthInputField } from "@/components/auth-card/auth-input-field";
import AuthForm from "@/components/auth/auth-form";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/mutation/new-password";
import { useTranslation } from "@/i18n/client";

export function NewPasswordForm() {
  const { t } = useTranslation(undefined, "auth");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    NewPasswordSchema,
    async (data) => await newPassword(data, token),
  );

  return (
    <AuthForm
      result={result}
      title={t("new-password.title")}
      isSubmitting={isSubmitting}
      buttonLabel={
        isSubmitting ? t("new-password.submitting") : t("new-password.submit")
      }
      showSocial={false}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/login",
        label: t("new-password.extra-action"),
      }}
    >
      {/* Password Field */}
      <AuthInputField
        type="password"
        label={t("new-password.password.label")}
        placeholder={t("new-password.password.placeholder")}
        register={form.register("password")}
        disabled={isSubmitting}
        error={form.formState.errors.password?.message}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
