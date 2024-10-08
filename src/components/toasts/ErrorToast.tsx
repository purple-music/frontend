import { ReactNode } from "react";

export function ErrorToast({ children }: { children: ReactNode }) {
  return (
    <div className="flex-start alert alert-error flex flex-col">{children}</div>
  );
}
