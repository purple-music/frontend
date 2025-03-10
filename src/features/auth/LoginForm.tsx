"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TbLock, TbMail } from "react-icons/tb";
import { z } from "zod";

import { useLoginMutation } from "@/api/mutations/auth/login";
import AuthForm from "@/features/auth/AuthForm";
import { AuthInputField } from "@/features/auth/auth-card/AuthInputField";
import { ActionResult } from "@/lib/types";
import { authError } from "@/lib/utils/actions";
import { LoginSchema } from "@/schemas/schemas";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const { t } = useTranslation("auth");
  const router = useRouter();

  console.log("Search params", searchParams);

  // Handle OAuth errors
  const urlError = {
    OAuthAccountNotLinked: t("login.oauth-error.OAuthAccountNotLinked"),
    OAuthCallbackError: t("login.oauth-error.OAuthCallbackError"),
  }[searchParams.get("error") || ""];

  const [result, setResult] = useState<ActionResult | null>(null);

  const mutation = useLoginMutation({
    onSuccess: (data) => {
      alert(JSON.stringify(data.message));

      router.push("/my");
    },
    onError: (error) => {
      const errorMessage = error.data.message;
      const statusCode = error.data.statusCode;
      let displayMessage = errorMessage;
      if (statusCode === 400) {
        displayMessage = t("login.errors.bad-request");
      } else if (statusCode === 401) {
        displayMessage = t("login.errors.unauthorized");
      }
      setResult(authError(displayMessage));
      return;
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
      resultMessage={result?.message || urlError || null}
      resultIsSuccess={mutation.isSuccess}
      title={t("login.title")}
      isSubmitting={isSubmitting || mutation.isPending}
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
