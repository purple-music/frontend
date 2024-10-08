import { useCallback, useEffect, useState } from "react";

import { ActionResult } from "@/lib/types";

export function useAsyncAction(
  action: () => Promise<ActionResult>,
  dependencies: any[] = [],
) {
  const [result, setResult] = useState<ActionResult | null>(null);

  const execute = useCallback(() => {
    if (result) return;

    action()
      .then((result) => setResult(result))
      .catch(() => {
        setResult({ type: "error", message: "Unexpected error occurred!" });
      });
  }, [...dependencies, result, action]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { result };
}
