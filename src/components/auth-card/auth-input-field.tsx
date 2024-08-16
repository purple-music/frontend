import Link from "next/link";
import React, { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

function ErrorMessage({ error, id }: { error?: string; id: string }) {
  if (!error) return null;
  return (
    <p
      id={id}
      aria-live="polite"
      aria-atomic="true"
      className="mt-1 text-start text-sm text-red-500"
    >
      {error}
    </p>
  );
}

interface AuthInputFieldProps {
  type: string;
  label: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  action?: { href: string; label: string };
  icon?: ReactNode;
  register: UseFormRegisterReturn;
}

export function AuthInputField({
  type,
  label,
  placeholder,
  error,
  disabled,
  action,
  icon,
  register,
}: AuthInputFieldProps) {
  const name = register.name;
  const inputId = `${name}-error`;
  return (
    <div className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
        {action && (
          <Link href={action.href} className="link-hover link label-text-alt">
            {action.label}
          </Link>
        )}
      </div>
      <label
        className={`input input-bordered flex w-full max-w-xs items-center gap-4 ${error && "input-error"}`}
      >
        {icon && <span>{icon}</span>}
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className={``}
          aria-describedby={inputId}
          disabled={disabled}
        />
      </label>
      <ErrorMessage error={error} id={inputId} />
    </div>
  );
}
