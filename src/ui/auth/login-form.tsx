"use client";

import React from "react";
import { authenticate } from "@/actions/mutation/authenticate";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import AuthForm from "@/ui/auth/auth-form";

export default function LoginForm() {
  // Use useActionState to manage form submission state
  const [error, formAction, isPending] = useFormState(authenticate, {});

  // Extract error messages from action state
  const errors = error?.errors;
  const message = error?.message;

  return (
    <AuthForm
      action={formAction}
      message={message}
      title={"Login"}
      isPending={isPending}
      buttonLabel={isPending ? "Logging in..." : "Login"}
      extraActionHref="/auth/register"
      extraActionLabel="Don't have an account? Create one"
    >
      {/* Email Field */}
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        errorMessages={errors?.email}
        disabled={isPending}
      />

      {/* Password Field */}
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        errorMessages={errors?.password}
        disabled={isPending}
      />
    </AuthForm>
  );
}
