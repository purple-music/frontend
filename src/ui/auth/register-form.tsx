"use client";

import React from "react";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import { registerUser } from "@/actions/mutation/register";
import AuthForm from "@/ui/auth/auth-form";

export default function RegisterForm() {
  // Use useActionState to manage form submission state
  const [state, formAction, isPending] = useFormState(registerUser, {});

  // Extract error messages from action state
  const errors = state.errors;
  const generalError = state.generalError;
  const success = state.success;

  return (
    <AuthForm
      action={formAction}
      generalError={generalError}
      success={success}
      title={"Register"}
      isPending={isPending}
      buttonLabel={isPending ? "Registering..." : "Register"}
      extraActionHref="/auth/login"
      extraActionLabel="Already have an account? Sign in"
    >
      {/* Name Field */}
      <InputField
        type="text"
        name="name"
        placeholder="Name"
        errorMessages={errors?.name}
      />

      {/* Email Field */}
      <InputField
        type="email"
        name="email"
        placeholder="Email"
        errorMessages={errors?.email}
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
