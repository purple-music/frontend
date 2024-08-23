import { ReactNode } from "react";

export function PseudoLine({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return (
    <div className="flex">
      <div className={`w-4 ${color} rounded-full`}></div>
      <div className="flex-1 ps-2">{children}</div>
    </div>
  );
}
