import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { ActionResult } from "@/lib/types";

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
    } catch (error) {
      console.error(error); // TODO: Replace with a logging tool if necessary
      setResult({ type: "error", message: "Unexpected error occurred!" });
    }
  };

  return {
    form,
    onSubmit,
    result,
    isSubmitting: form.formState.isSubmitting,
  };
}
