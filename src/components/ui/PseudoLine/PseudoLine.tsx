import { ReactNode } from "react";

const PseudoLine = ({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) => {
  return (
    <div className="flex h-full flex-row items-center gap-4">
      <div className={`w-2 ${color} h-full rounded-full`}></div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PseudoLine;
