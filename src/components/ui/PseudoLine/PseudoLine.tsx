import { ReactNode } from "react";

const PseudoLine = ({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) => {
  return (
    <div className="flex gap-4 items-center h-full flex-row">
      <div className={`w-2 ${color} rounded-full h-full`}></div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default PseudoLine;

