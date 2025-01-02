import clsx from "clsx";
import React from "react";

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {}

const Surface = ({ children, className }: SurfaceProps) => {
  return (
    <div
      className={clsx(
        "flex w-fit flex-col rounded-[32px] bg-surface-container-low p-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Surface;
