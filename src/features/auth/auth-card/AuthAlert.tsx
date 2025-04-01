import { TbExclamationCircle, TbRosetteDiscountCheck } from "react-icons/tb";

export interface AuthAlertProps {
  message: string;
  isSuccess: boolean;
}

export function AuthAlert({ message, isSuccess }: AuthAlertProps) {
  return (
    <div
      role="alert"
      className={`alert ${isSuccess ? "alert-success" : "alert-error"} rounded-lg text-start`}
    >
      {isSuccess ? <TbRosetteDiscountCheck /> : <TbExclamationCircle />}
      <span>{message}</span>
    </div>
  );
}
