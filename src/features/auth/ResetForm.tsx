"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TbMail } from "react-icons/tb";
import { z } from "zod";

import { useResetPasswordMutation } from "@/api/mutations/auth/reset-password";
import AuthForm from "@/features/auth/AuthForm";
import { AuthInputField } from "@/features/auth/auth-card/AuthInputField";
import { ResetSchema } from "@/schemas/schemas";

export function ResetForm() {
  const { t } = useTranslation("auth");
  const mutation = useResetPasswordMutation();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
  });

  const onSubmit = async (data: z.infer<typeof ResetSchema>) => {
    return mutation.mutate(data);
  };

  return (
    <AuthForm
      resultMessage={mutation.data?.message || mutation.error?.message || null}
      resultIsSuccess={mutation.isSuccess}
      title={t("reset.title")}
      isSubmitting={isSubmitting}
      buttonLabel={isSubmitting ? t("reset.submitting") : t("reset.submit")}
      showSocial={false}
      onSubmit={handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/login",
        label: t("reset.extra-action"),
      }}
    >
      {/* Email Field */}
      <AuthInputField
        type="email"
        label={t("reset.email.label")}
        register={formRegister("email")}
        placeholder={t("reset.email.placeholder")}
        error={errors.email?.message}
        disabled={isSubmitting}
        icon={<TbMail />}
      />
    </AuthForm>
  );
}
