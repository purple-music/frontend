"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TbLock, TbMail, TbUser } from "react-icons/tb";
import { z } from "zod";

import { registerUser } from "@/actions/mutation/register";
import AuthForm from "@/features/auth/AuthForm";
import { AuthInputField } from "@/features/auth/auth-card/AuthInputField";
import { register } from "@/lib/auth";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { ActionResult } from "@/lib/types";
import { RegisterSchema } from "@/schemas/schemas";

export default function RegisterForm() {
  const { t } = useTranslation("auth");
  const [result, setResult] = useState<ActionResult | null>(null);

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof RegisterSchema>) =>
      register(data.email, data.password, data.name),
    onSuccess: (data: ActionResult) => {
      setResult(data);
      alert(JSON.stringify(data));
    },
  });
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  return (
    <AuthForm
      result={result}
      title={t("register.title")}
      isSubmitting={isSubmitting}
      buttonLabel={
        isSubmitting ? t("register.submitting") : t("register.submit")
      }
      showSocial={true}
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
        return mutation.mutate({
          email: data.email,
          password: data.password,
          name: data.name,
        });
      })}
      extraAction={{
        href: "/auth/login",
        label: t("register.extra-action"),
      }}
    >
      {/* Name Field */}
      <AuthInputField
        type="text"
        label={t("register.name.label")}
        register={formRegister("name")}
        placeholder={t("register.name.placeholder")}
        error={errors.name?.message}
        icon={<TbUser />}
      />

      {/* Email Field */}
      <AuthInputField
        type="email"
        label={t("register.email.label")}
        register={formRegister("email")}
        placeholder={t("register.email.placeholder")}
        error={errors.email?.message}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <AuthInputField
        type="password"
        label={t("register.password.label")}
        register={formRegister("password")}
        placeholder={t("register.password.placeholder")}
        error={errors.password?.message}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
