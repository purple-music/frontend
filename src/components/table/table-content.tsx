import { ReactNode } from "react";

export function TableContent({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 flex-row">{children}</div>;
}
