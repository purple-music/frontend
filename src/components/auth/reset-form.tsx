"use client";

import { resetPassword } from "@/actions/mutation/reset";
import { TbMail } from "react-icons/tb";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { ResetSchema } from "@/schemas/schemas";
import { AuthInputField } from "@/components/auth-card/auth-input-field";
import AuthForm from "@/components/auth/auth-form";
import { useTranslation } from "@/i18n/client";

export function ResetForm() {
  const { t } = useTranslation(undefined, "auth");
  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    ResetSchema,
    resetPassword,
  );

  return (
    <AuthForm
      result={result}
      title={t("reset.title")}
      isSubmitting={isSubmitting}
      buttonLabel={isSubmitting ? t("reset.submitting") : t("reset.submit")}
      showSocial={false}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/login",
        label: t("reset.extra-action"),
      }}
    >
      {/* Email Field */}
      <AuthInputField
        type="email"
        label={t("reset.email.label")}
        register={form.register("email")}
        placeholder={t("reset.email.placeholder")}
        error={form.formState.errors.email?.message}
        disabled={isSubmitting}
        icon={<TbMail />}
      />
    </AuthForm>
  );
}
