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
        "flex items-center self-stretch whitespace-nowrap before:flex-1 before:bg-outline-variant after:flex-1 after:bg-outline-variant",
        {
          "my-2 h-4 w-full flex-row before:h-[1px] before:w-full after:h-[1px] after:w-full":
            direction === "horizontal",
          "mx-2 h-full w-4 flex-col before:h-full before:w-[1px] after:h-full after:w-[1px]":
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
