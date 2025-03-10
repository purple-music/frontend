"use client";

import { useTranslation } from "react-i18next";
import { TbMail } from "react-icons/tb";

import { resetPassword } from "@/actions/mutation/reset";
import AuthForm from "@/features/auth/AuthForm";
import { AuthInputField } from "@/features/auth/auth-card/AuthInputField";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { ResetSchema } from "@/schemas/schemas";

export function ResetForm() {
  const { t } = useTranslation("auth");
  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    ResetSchema,
    resetPassword,
  );

  return "Placeholder";

  // return (
  //   <AuthForm
  //     result={result}
  //     title={t("reset.title")}
  //     isSubmitting={isSubmitting}
  //     buttonLabel={isSubmitting ? t("reset.submitting") : t("reset.submit")}
  //     showSocial={false}
  //     onSubmit={form.handleSubmit(onSubmit)}
  //     extraAction={{
  //       href: "/auth/login",
  //       label: t("reset.extra-action"),
  //     }}
  //   >
  //     {/* Email Field */}
  //     <AuthInputField
  //       type="email"
  //       label={t("reset.email.label")}
  //       register={form.register("email")}
  //       placeholder={t("reset.email.placeholder")}
  //       error={form.formState.errors.email?.message}
  //       disabled={isSubmitting}
  //       icon={<TbMail />}
  //     />
  //   </AuthForm>
  // );
}
