"use client";

import React from "react";
import { registerUser } from "@/actions/mutation/register";
import { TbLock, TbMail, TbUser } from "react-icons/tb";
import { RegisterSchema } from "@/schemas/schemas";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { AuthInputField } from "@/components/auth-card/AuthInputField";
import AuthForm from "@/components/auth/AuthForm";
import { useTranslation } from "@/i18n/client";

export default function RegisterForm() {
  const { t } = useTranslation(undefined, "auth");
  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    RegisterSchema,
    registerUser,
  );

  return (
    <AuthForm
      result={result}
      title={t("register.title")}
      isSubmitting={isSubmitting}
      buttonLabel={
        isSubmitting ? t("register.submitting") : t("register.submit")
      }
      showSocial={true}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/login",
        label: t("register.extra-action"),
      }}
    >
      {/* Name Field */}
      <AuthInputField
        type="text"
        label={t("register.name.label")}
        register={form.register("name")}
        placeholder={t("register.name.placeholder")}
        error={form.formState.errors.name?.message}
        icon={<TbUser />}
      />

      {/* Email Field */}
      <AuthInputField
        type="email"
        label={t("register.email.label")}
        register={form.register("email")}
        placeholder={t("register.email.placeholder")}
        error={form.formState.errors.email?.message}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <AuthInputField
        type="password"
        label={t("register.password.label")}
        register={form.register("password")}
        placeholder={t("register.password.placeholder")}
        error={form.formState.errors.password?.message}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
