"use client";

import React from "react";
import { authenticate } from "@/actions/mutation/authenticate";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import { Social } from "@/ui/auth/social";
import { CreateAccount } from "@/ui/auth/create-account";
import { ErrorAlert } from "@/ui/auth/error-alert";

export default function LoginForm() {
  // Use useActionState to manage form submission state
  const [error, formAction, isPending] = useFormState(authenticate, {});

  // Extract error messages from action state
  const errors = error?.errors;
  const message = error?.message;

  return (
    <form
      // Use form action to handle form submission
      action={formAction}
      className="card bg-base-100"
    >
      <section className="card-body items-stretch gap-4">
        <h1 className="card-title mb-2 text-2xl">
          {/* TODO: fix isPending problem */}
          Login {isPending ? "Y" : "N"}
        </h1>

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

        {/* General Message */}
        <ErrorAlert message={message} />

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary text-white"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        <div className="divider">or</div>

        <Social />
        <CreateAccount
          href={"/auth/register"}
          label="Don't have an account? Create one"
        />
      </section>
    </form>
  );
}
