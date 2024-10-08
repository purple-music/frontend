import { ReactNode } from "react";

export function TableCell({
  children,
  cellHeight = 2,
}: {
  children: ReactNode;
  cellHeight?: number;
}) {
  return <div style={{ height: `${cellHeight}rem` }}>{children}</div>;
}
