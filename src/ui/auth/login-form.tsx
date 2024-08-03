"use client";

import React from "react";
import { authenticate } from "@/actions/actions";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";
import { Social } from "@/ui/auth/social";

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
      <section className="card-body">
        <h1 className="card-title mb-4 text-2xl">Login</h1>

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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full rounded px-4 py-2 text-white"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </button>

        {/* General Message */}
        {message && <p className="mt-4 text-red-500">{message}</p>}

        <Social />
      </section>
    </form>
  );
}
