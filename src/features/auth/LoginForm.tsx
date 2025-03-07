"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TbLock, TbMail } from "react-icons/tb";
import { z } from "zod";

import AuthForm from "@/features/auth/AuthForm";
import { AuthInputField } from "@/features/auth/auth-card/AuthInputField";
import { login, register } from "@/lib/auth";
import { ActionResult } from "@/lib/types";
import { authError, authSuccess } from "@/lib/utils/actions";
import { LoginSchema } from "@/schemas/schemas";

type LoginResponse = {
  access_token: string;
};

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { t } = useTranslation("auth");

  console.log("Search params", searchParams);

  // Handle OAuth errors
  const urlError = {
    OAuthAccountNotLinked: t("login.oauth-error.OAuthAccountNotLinked"),
    OAuthCallbackError: t("login.oauth-error.OAuthCallbackError"),
  }[searchParams.get("error") || ""];

  const [result, setResult] = useState<ActionResult | null>(null);

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof LoginSchema>) =>
      login(data.email, data.password),
    onSuccess: (data: LoginResponse) => {
      setResult(authSuccess(data.access_token));
      alert(JSON.stringify(data));
    },
    onError: (error: any) => {
      if (error.message === "NEXT_REDIRECT") {
        throw error;
      }
      console.error("Error submitting form", error);
      setResult(authError("Server error occurred!"));
    },
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  return (
    <AuthForm
      result={result}
      title={t("login.title")}
      isSubmitting={isSubmitting}
      buttonLabel={isSubmitting ? t("login.submitting") : t("login.submit")}
      showSocial={true}
      onSubmit={handleSubmit((data) => {
        mutation.mutate(data);
      })}
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
        register={formRegister("email")}
        error={errors.email?.message}
        disabled={isSubmitting}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <AuthInputField
        type="password"
        label={t("login.password.label")}
        placeholder={t("login.password.placeholder")}
        register={formRegister("password")}
        disabled={isSubmitting}
        error={errors.password?.message}
        action={{ href: "/auth/reset", label: t("login.password.forgot") }}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
