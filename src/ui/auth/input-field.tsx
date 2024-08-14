import Link from "next/link";
import React, { ReactNode } from "react";

function ErrorMessage({ messages, id }: { messages?: string[]; id: string }) {
  if (!messages) return null;
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {messages.map((error) => (
        <p className="mt-1 text-start text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export function InputField({
  type,
  label,
  name,
  placeholder,
  errorMessages,
  disabled,
  action,
}: {
  type: string;
  label: string;
  name: string;
  placeholder: string;
  errorMessages?: string[];
  disabled?: boolean;
  action?: { href: string; label: string };
  icon?: ReactNode;
}) {
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
        className={`input input-bordered flex w-full max-w-xs items-center gap-4 ${errorMessages && "input-error"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={``}
          aria-describedby={`${name}-error`}
          disabled={disabled}
        />
      </label>
      <ErrorMessage messages={errorMessages} id={`${name}-error`} />
    </div>
  );
}
