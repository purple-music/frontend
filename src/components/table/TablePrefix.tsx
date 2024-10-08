import { TableHeader } from "@/components/table/TableHeader";
import { ReactNode } from "react";

export function TablePrefix({
  children,
  headerHeight = 2,
}: {
  children: ReactNode;
  headerHeight?: number;
}) {
  return (
    <div className={"divide-y divide-base-300"}>
      <TableHeader cellHeight={headerHeight} />
      <div className="flex flex-col items-end pr-1">{children}</div>
    </div>
  );
}
