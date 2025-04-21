import { ValidationError, ValidationErrorItem } from "@/lib/axios";

const renderValidationErrors = (errors: ValidationErrorItem[]) => {
  return (
    <ul>
      {errors.map((error, index) => (
        <li key={index} className="ml-4">
          {/* Field name */}
          <div className="font-semibold">{error.field}:</div>
          {/* Error messages */}
          {error.messages && (
            <ul className="list-inside list-disc">
              {error.messages.map((message, msgIndex) => (
                <li key={msgIndex} className="text-sm">
                  {message}
                </li>
              ))}
            </ul>
          )}
          {/* Recursively render nested errors */}
          {error.children && renderValidationErrors(error.children)}
        </li>
      ))}
    </ul>
  );
};

export function ValidationErrorToast({ error }: { error: ValidationError }) {
  const statusCode = error.statusCode;
  const errors = error.errors; // Recursive ValidationErrorItemDto
  const message = error.message; // "Validation error";

  return (
    <div className="alert alert-error flex flex-col">
      {/* Status code and main message */}
      <div className="font-bold">
        {statusCode}: {message}
      </div>
      {/* Render nested validation errors */}
      {errors && renderValidationErrors(errors)}
    </div>
  );
}
