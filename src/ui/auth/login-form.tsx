"use client";

import React from "react";
import { authCredentials } from "@/actions/mutation/login";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import AuthForm from "@/ui/auth/auth-form";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  // Use useActionState to manage form submission state
  const [state, formAction, isPending] = useFormState(authCredentials, {}); // TODO: replace with startTransition
  const searchParams = useSearchParams();

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already in use with a different provider!"
      : undefined;

  // Extract error messages from action state
  const errors = state.errors;

  return (
    <AuthForm
      action={formAction}
      generalError={state.generalError || urlError}
      success={state.success}
      title={"Login"}
      isPending={isPending} // TODO: use startTransition or fix the bug
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
