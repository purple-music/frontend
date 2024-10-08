import { ReactNode } from "react";

export function SuccessToast({ children }: { children: ReactNode }) {
  return (
    <div className="flex-start alert alert-success flex flex-col">
      {children}
    </div>
  );
}
