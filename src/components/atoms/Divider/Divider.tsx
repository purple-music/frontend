import clsx from "clsx";
import { ReactNode } from "react";

interface DividerProps {
  children?: ReactNode;
  direction?: "horizontal" | "vertical";
}

const Divider = ({ children, direction = "horizontal" }: DividerProps) => {
  return (
    <div
      className={clsx(
        "self-stretch whitespace-nowrap items-center before:bg-outline-variant after:bg-outline-variant flex before:flex-1 after:flex-1",
        {
          "flex-row w-full h-4 my-2 before:h-[1px] after:h-[1px] before:w-full after:w-full":
            direction === "horizontal",
          "flex-col w-4 h-full mx-2 before:h-full after:h-full before:w-[1px] after:w-[1px]":
            direction === "vertical",
          "gap-2": children,
        },
      )}
    >
      {children}
    </div>
  );
};

export default Divider;
