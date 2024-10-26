import clsx from "clsx";
import { ReactNode } from "react";

import Typography from "@/components/atoms/Typography/Typograhy";

interface ButtonBaseProps {
  children?: ReactNode;
  onClick?: () => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /** Should be specified: bg color, text color, on hover, focus outline color. Other stuff is optional */
  className?: string;
  disabled?: boolean;
  squared?: boolean;
}

const ButtonBase = ({
  children,
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  className,
  squared,
}: ButtonBaseProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center focus:outline outline-offset-2 outline-4 rounded-full h-10",
        !squared && "px-6 gap-2",
        !squared && startIcon && "pl-4",
        !squared && endIcon && "pr-4",
        squared && "p-0 w-10",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {startIcon}
      {children}
      {endIcon}
    </button>
  );
};

export default ButtonBase;
