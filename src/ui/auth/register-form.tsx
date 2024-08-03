"use client";

import React from "react";
import { useFormState } from "react-dom";
import { registerUser } from "@/actions/actions";
import { InputField } from "@/ui/auth/input-field";

export default function RegisterForm() {
  // Use useActionState to manage form submission state
  const [error, formAction, isPending] = useFormState(registerUser, {});

  // Extract error messages from action state
  const errors = error?.errors;
  const message = error?.message;

  return (
    <form
      // Use form action to handle form submission
      action={formAction}
      className="card w-full max-w-sm bg-base-100"
    >
      <section className="card-body">
        <h1 className="card-title mb-4 text-2xl">Register</h1>

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

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full rounded px-4 py-2 text-white"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        {/* General Message */}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </section>
    </form>
  );
}
