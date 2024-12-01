import clsx from "clsx";
import React from "react";

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {}

const Surface = ({ children, className }: SurfaceProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col bg-surface-container-low rounded-[32px] p-4 w-fit",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Surface;
