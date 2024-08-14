"use client";

import React from "react";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import { registerUser } from "@/actions/mutation/register";
import AuthForm from "@/ui/auth/auth-form";
import { TbLock, TbMail, TbUser } from "react-icons/tb";

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
      {/* // TODO: use tabler icons everywhere in the app instead of react-icons */}
      {/* Name Field */}
      <InputField
        type="text"
        label="Name"
        name="name"
        placeholder="John"
        errorMessages={errors?.name}
        icon={<TbUser />}
      />

      {/* Email Field */}
      <InputField
        type="email"
        label="Email"
        name="email"
        placeholder="john@gmail.com"
        errorMessages={errors?.email}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <InputField
        type="password"
        label="Password"
        name="password"
        placeholder="******"
        errorMessages={errors?.password}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
