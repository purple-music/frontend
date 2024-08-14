"use client";

import React from "react";
import { authCredentials } from "@/actions/mutation/login";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import AuthForm from "@/ui/auth/auth-form";
import { useSearchParams } from "next/navigation";
import { TbLock, TbMail } from "react-icons/tb";

export default function LoginForm() {
  // Use useActionState to manage form submission state
  const [state, formAction, isPending] = useFormState(authCredentials, {}); // TODO: replace with startTransition
  // TODO: instead of using field errors from state, use zod error from the component. Server will validate everything anyway. No point of getting it from the server
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
        label="Email"
        placeholder="john@email.com"
        errorMessages={errors?.email}
        disabled={isPending}
        icon={<TbMail />}
      />

      {/* Password Field */}
      <InputField
        type="password"
        name="password"
        label="Password"
        placeholder="******"
        errorMessages={errors?.password}
        disabled={isPending}
        action={{ href: "/auth/reset", label: "Forgot password?" }}
        icon={<TbLock />}
      />
    </AuthForm>
  );
}
