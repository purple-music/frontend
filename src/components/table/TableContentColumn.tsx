import { TableHeader } from "@/components/table/TableHeader";
import { ReactNode } from "react";

export function TableContentColumn({
  children,
  header,
  headerHeight = 2,
}: {
  children: ReactNode;
  header: ReactNode;
  headerHeight?: number;
}) {
  return (
    <div className="flex flex-1 flex-col divide-y divide-base-300 border-l border-base-content">
      <TableHeader cellHeight={headerHeight}>{header}</TableHeader>
      <div className="flex flex-col divide-y divide-base-300">{children}</div>
    </div>
  );
}
