import React from "react";

function ErrorMessage({ messages, id }: { messages?: string[]; id: string }) {
  if (!messages) return null;
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {messages.map((error) => (
        <p className="mt-1 text-sm text-red-500" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}

export function InputField({
  type,
  name,
  placeholder,
  errorMessages,
  disabled
}: {
  type: string;
  name: string;
  placeholder: string;
  errorMessages?: string[];
  disabled: boolean;
}) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input input-bordered w-full ${errorMessages ? "border-red-500" : ""}`}
        aria-describedby={`${name}-error`}
        disabled={disabled}
      />
      <ErrorMessage messages={errorMessages} id={`${name}-error`} />
    </div>
  );
}
