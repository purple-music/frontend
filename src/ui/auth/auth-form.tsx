"use client";

import React from "react";
import { useFormState } from "react-dom";
import { InputField } from "@/ui/auth/input-field";

interface AuthFormProps {
  action: (formData: FormData) => Promise<any>;
  title: string;
  fields: {
    type: string;
    name: string;
    placeholder: string;
  }[];
  buttonText: string;
  buttonPendingText: string;
}

export default function AuthForm({
  action,
  title,
  fields,
  buttonText,
  buttonPendingText,
}: AuthFormProps) {
  // Use useActionState to manage form submission state
  const [error, formAction, isPending] = useFormState(action, {});

  // Extract error messages from action state
  const errors = error?.errors;
  const message = error?.message;

  return (
    <form
      // Use form action to handle form submission
      action={formAction}
      className="card max-w-sm bg-base-100"
    >
      <section className="card-body">
        <h1 className="card-title mb-4 text-2xl">{title}</h1>

        {fields.map((field) => (
          <InputField
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            errorMessages={errors?.[field.name]}
          />
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full rounded px-4 py-2 text-white"
          disabled={isPending}
        >
          {isPending ? buttonPendingText : buttonText}
        </button>

        {/* General Message */}
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </section>
    </form>
  );
}
