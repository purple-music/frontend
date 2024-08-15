"use client";

import React from "react";
import { registerUser } from "@/actions/mutation/register";
import { TbLock, TbMail, TbUser } from "react-icons/tb";
import { RegisterSchema } from "@/schemas/schemas";
import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { AuthInputField } from "@/components/auth-card/auth-input-field";
import AuthForm from "@/components/auth/auth-form";

export default function RegisterForm() {
  const { form, onSubmit, result, isSubmitting } = useAuthForm(
    RegisterSchema,
    registerUser,
  );

  return (
    <AuthForm
      result={result}
      title="Register"
      isSubmitting={isSubmitting}
      buttonLabel={isSubmitting ? "Registering..." : "Register"}
      showSocial={true}
      onSubmit={form.handleSubmit(onSubmit)}
      extraAction={{
        href: "/auth/login",
        label: "Already have an account? Sign in",
      }}
    >
      {/* Name Field */}
      <AuthInputField
        type="text"
        label="Name"
        register={form.register("name")}
        placeholder="John"
        error={form.formState.errors.name?.message}
        icon={<TbUser />}
      />

      {/* Email Field */}
      <AuthInputField
        type="email"
        label="Email"
        register={form.register("email")}
        placeholder="john@gmail.com"
        error={form.formState.errors.email?.message}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <AuthInputField
        type="password"
        label="Password"
        register={form.register("password")}
        placeholder="******"
        error={form.formState.errors.password?.message}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
