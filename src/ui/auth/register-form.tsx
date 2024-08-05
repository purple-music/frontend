"use client";

import React from "react";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import { registerUser } from "@/actions/mutation/register-user";
import AuthForm from "@/ui/auth/auth-form";

export default function RegisterForm() {
  // Use useActionState to manage form submission state
  const [error, formAction, isPending] = useFormState(registerUser, {});

  // Extract error messages from action state
  const errors = error?.errors;
  const message = error?.message;

  return (
    <AuthForm
      action={formAction}
      message={message}
      title={"Register"}
      isPending={isPending}
      buttonLabel={isPending ? "Registering..." : "Register"}
      extraActionHref="/auth/login"
      extraActionLabel="Already have an account? Sign in"
    >
      {/* Email Field */}
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        errorMessages={errors?.email}
      />

      {/* Name Field */}
      <InputField
        type="text"
        name="name"
        placeholder="Name"
        errorMessages={errors?.name}
      />

      {/* Password Field */}
      <InputField
        type="password"
        name="password"
        placeholder="Password"
        errorMessages={errors?.password}
      />
    </AuthForm>
  );
}
