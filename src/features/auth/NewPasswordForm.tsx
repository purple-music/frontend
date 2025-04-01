"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TbLock } from "react-icons/tb";
import { z } from "zod";

import { useNewPasswordMutation } from "@/api/mutations/auth/new-password";
import AuthForm from "@/features/auth/AuthForm";
import { AuthInputField } from "@/features/auth/auth-card/AuthInputField";
import { NewPasswordSchema } from "@/schemas/schemas";

export function NewPasswordForm() {
  const { t } = useTranslation("auth");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const mutation = useNewPasswordMutation();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    if (!token) return;
    return mutation.mutate({ password: data.password, token });
  };

  let message: string | null = null;
  if (mutation.isPending) message = t("new-password.pending");
  if (mutation.isError) message = mutation.error.data.message;
  if (mutation.isSuccess) message = t("new-password.success");
  if (mutation.isIdle) message = t("new-password.idle");
  if (!token) message = t("new-password.missing-token");
  if (!message) message = t("new-password.error");

  return (
    <AuthForm
      resultMessage={message}
      resultIsSuccess={mutation.isSuccess}
      title={t("new-password.title")}
      isSubmitting={isSubmitting}
      buttonLabel={
        isSubmitting ? t("new-password.submitting") : t("new-password.submit")
      }
      showSocial={false}
      onSubmit={handleSubmit(onSubmit)}
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
        register={formRegister("password")}
        disabled={isSubmitting}
        error={errors.password?.message}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
