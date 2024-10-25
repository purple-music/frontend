import clsx from "clsx";
import { ReactNode } from "react";

import Typography from "@/components/atoms/Typography/Typograhy";

interface Button {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "filled" | "tonal" | "elevated" | "outlined" | "text";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

const Button = ({
  label: children,
  onClick,
  disabled = false,
  variant = "filled",
  startIcon,
  endIcon,
  className,
}: Button) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "flex items-center justify-center focus:outline focus:outline-4 rounded-full h-10 gap-4 px-6",
        {
          filled:
            "bg-primary text-on-primary enabled:hover:brightness-90 focus:outline-primary-container",
          tonal:
            "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary",
          elevated:
            "bg-surface-container-low text-primary border border-outline enabled:hover:brightness-90 focus:outline-primary-container box-border",
          outlined:
            "bg-transparent text-primary border border-outline enabled:hover:bg-primary-container focus:outline-primary-container box-border",
          text: "bg-transparent text-primary enabled:hover:bg-primary-container focus:outline-primary-container",
        }[variant],
        startIcon && "pl-4",
        endIcon && "pr-4",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {startIcon}
      <Typography
        variant="labelBold"
        size={"large"}
        component="span"
        children={children}
      />
      {endIcon}
    </button>
  );
};

export default Button;
