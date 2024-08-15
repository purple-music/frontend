"use client";

import React from "react";
import { authCredentials } from "@/actions/mutation/login";
import { useSearchParams } from "next/navigation";
import { TbLock, TbMail } from "react-icons/tb";
import { LoginSchema } from "@/schemas/schemas";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { AuthInputField } from "@/components/auth-card/auth-input-field";
import AuthForm from "@/components/auth/auth-form";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with a different provider!"
      : undefined;

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
      title="Login"
      isSubmitting={isSubmitting}
      buttonLabel={isSubmitting ? "Logging in..." : "Login"}
      showSocial={true}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/register",
        label: "Don't have an account? Create one",
      }}
    >
      {/* Email Field */}
      <AuthInputField
        type="email"
        label="Email"
        placeholder="john@email.com"
        register={form.register("email")}
        error={form.formState.errors.email?.message}
        disabled={isSubmitting}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <AuthInputField
        type="password"
        label="Password"
        placeholder="******"
        register={form.register("password")}
        disabled={isSubmitting}
        error={form.formState.errors.password?.message}
        action={{ href: "/auth/reset", label: "Forgot password?" }}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
