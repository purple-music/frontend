import { ReactNode } from "react";

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="card card-body glass max-w-sm items-stretch gap-4 bg-base-100 text-center">
      {children}
    </div>
  );
}
