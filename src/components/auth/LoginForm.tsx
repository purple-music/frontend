"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { TbLock, TbMail } from "react-icons/tb";

import { authCredentials } from "@/actions/mutation/login";
import { AuthInputField } from "@/components/auth-card/AuthInputField";
import AuthForm from "@/components/auth/AuthForm";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { LoginSchema } from "@/schemas/schemas";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { t } = useTranslation("auth");

  console.log("Search params", searchParams);

  // Handle OAuth errors
  const urlError = {
    OAuthAccountNotLinked: t("login.oauth-error.OAuthAccountNotLinked"),
    OAuthCallbackError: t("login.oauth-error.OAuthCallbackError"),
  }[searchParams.get("error") || ""];

  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    LoginSchema,
    async (data) => {
      if (urlError) {
        return { type: "error", message: urlError };
      }
      return await authCredentials(data);
    },
  );

  return (
    <AuthForm
      result={result}
      title={t("login.title")}
      isSubmitting={isSubmitting}
      buttonLabel={isSubmitting ? t("login.submitting") : t("login.submit")}
      showSocial={true}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/register",
        label: t("login.extra-action"),
      }}
    >
      {/* Email Field */}
      <AuthInputField
        type="email"
        label={t("login.email.label")}
        placeholder={t("login.email.placeholder")}
        register={form.register("email")}
        error={form.formState.errors.email?.message}
        disabled={isSubmitting}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <AuthInputField
        type="password"
        label={t("login.password.label")}
        placeholder={t("login.password.placeholder")}
        register={form.register("password")}
        disabled={isSubmitting}
        error={form.formState.errors.password?.message}
        action={{ href: "/auth/reset", label: t("login.password.forgot") }}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
