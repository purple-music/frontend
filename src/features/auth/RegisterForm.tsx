"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TbLock, TbMail, TbUser } from "react-icons/tb";
import { z } from "zod";

import { useRegisterMutation } from "@/api/mutations/auth/register";
import AuthForm from "@/features/auth/AuthForm";
import { AuthInputField } from "@/features/auth/auth-card/AuthInputField";
import { RegisterSchema } from "@/schemas/schemas";

export default function RegisterForm() {
  const { t } = useTranslation("auth");

  const { mutate, data, isPending, isError, error, isSuccess } =
    useRegisterMutation();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    return mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    });
  };

  return (
    <AuthForm
      resultMessage={data?.message || error?.message || null}
      resultIsSuccess={isSuccess}
      title={t("register.title")}
      isSubmitting={isSubmitting || isPending}
      buttonLabel={
        isSubmitting ? t("register.submitting") : t("register.submit")
      }
      showSocial={true}
      onSubmit={handleSubmit(onSubmit)}
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
