import React from "react";

function ErrorMessage({ messages, id }: { messages?: string[]; id: string }) {
  if (!messages) return null;
  return (
    <div id={id} aria-live="polite" aria-atomic="true">
      {messages.map((error) => (
        <p className="mt-2 text-sm text-red-500" key={error}>
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
}: {
  type: string;
  name: string;
  placeholder: string;
  errorMessages?: string[];
}) {
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`input border-gray-300 p-2 ${
          errorMessages ? "border-red-500" : ""
        }`}
        aria-describedby={`${name}-error`}
      />
      <ErrorMessage messages={errorMessages} id={`${name}-error`} />
    </div>
  );
}
