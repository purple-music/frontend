import clsx from "clsx";
import { ReactNode } from "react";

import Typography from "@/components/atoms/Typography/Typograhy";

import ButtonBase from "../ButtonBase/ButtonBase";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "filled" | "tonal" | "elevated" | "outlined" | "text";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string; // TODO: instead of doing this, make IconButton use ButtonBase instead?
  squared?: boolean;
}

const Button = ({
  label: children,
  onClick,
  disabled = false,
  variant = "filled",
  startIcon,
  endIcon,
  className,
  squared,
}: ButtonProps) => {
  return (
    <ButtonBase
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      disabled={disabled}
      squared={squared}
      className={clsx(
        {
          filled:
            "bg-primary text-on-primary enabled:hover:brightness-90 outline-primary",
          tonal:
            "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 outline-secondary",
          elevated:
            "bg-surface-container-low text-primary border border-outline enabled:hover:brightness-90 outline-primary box-border",
          outlined:
            "bg-transparent text-primary border border-outline enabled:hover:bg-primary-container outline-primary box-border",
          text: "bg-transparent text-primary enabled:hover:bg-primary-container outline-primary",
        }[variant],
        className,
      )}
    >
      {children && (
        <Typography variant="labelBold" size={"large"} component="span">
          {children}
        </Typography>
      )}
    </ButtonBase>
  );
};

export default Button;

