import { ActionResult } from "@/lib/types";
import { TbExclamationCircle, TbRosetteDiscountCheck } from "react-icons/tb";

export function AuthAlert({ result }: { result: ActionResult }) {
  const isSuccess = result.type === "success";

  return (
    <div
      role="alert"
      className={`alert ${isSuccess ? "alert-success" : "alert-error"} rounded-lg text-start`}
    >
      {isSuccess ? <TbExclamationCircle /> : <TbRosetteDiscountCheck />}
      <span>{result.message}</span>
    </div>
  );
}
