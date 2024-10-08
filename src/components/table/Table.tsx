import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return <div className="flex w-full flex-row">{children}</div>;
}
