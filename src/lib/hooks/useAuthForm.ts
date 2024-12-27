import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

import { ActionResult } from "@/lib/types";
import { authError } from "@/lib/utils/actions";

export function useAuthForm<T extends z.ZodType<any, any>>(
  schema: T,
  action: (data: z.infer<T>) => Promise<ActionResult>,
): {
  form: UseFormReturn<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  result: ActionResult | null;
  isSubmitting: boolean;
} {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  });

  const [result, setResult] = useState<ActionResult | null>(null);
  const onSubmit = async (data: z.infer<T>) => {
    try {
      const result = await action(data);
      setResult(result);
    } catch (error: any) {
      // If it is NEXT_REDIRECT, we shouldn't catch it, so rethrow it
      if (error.message === "NEXT_REDIRECT") {
        throw error;
      }
      console.error("Error submitting form", error);
      setResult(authError("Server error occurred!"));
    }
  };

  return {
    form,
    onSubmit,
    result,
    isSubmitting: form.formState.isSubmitting,
  };
}
