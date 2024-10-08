import { ReactNode } from "react";

export function TableHeader({
  children,
  cellHeight = 2,
}: {
  children?: ReactNode;
  cellHeight?: number;
}) {
  return (
    <div className="text-center" style={{ height: `${cellHeight}rem` }}>
      {children}
    </div>
  );
}
