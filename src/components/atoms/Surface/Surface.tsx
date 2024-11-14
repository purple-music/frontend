import clsx from "clsx";

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {}

const Surface = ({ children, className }: SurfaceProps) => {
  return (
    <div
      className={clsx(
        "flex flex-col bg-surface-container-low rounded-[32px] p-4 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Surface;
