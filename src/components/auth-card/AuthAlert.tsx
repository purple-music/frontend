import { TbExclamationCircle, TbRosetteDiscountCheck } from "react-icons/tb";

import { ActionResult } from "@/lib/types";

export function AuthAlert({ result }: { result: ActionResult }) {
  const isSuccess = result.type === "success";

  return (
    <div
      role="alert"
      className={`alert ${isSuccess ? "alert-success" : "alert-error"} rounded-lg text-start`}
    >
      {isSuccess ? <TbRosetteDiscountCheck /> : <TbExclamationCircle />}
      <span>{result.message}</span>
    </div>
  );
}
