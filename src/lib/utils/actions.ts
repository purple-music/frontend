import { ActionResult } from "@/lib/types";

export function authSuccess(message: string): ActionResult {
  return { type: "success", message };
}

export function authError(message: string): ActionResult {
  return { type: "error", message };
}
