import { clsx } from "clsx";
import { ReactNode } from "react";

import ButtonBase from "@/components/atoms/ButtonBase/ButtonBase";
import Typography from "@/components/atoms/Typography/Typography";

// Define button variants as a const to enable type inference
export const BUTTON_VARIANTS = {
  filled:
    "bg-primary text-on-primary enabled:hover:brightness-90 focus:outline-primary",
  tonal:
    "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary",
  elevated:
    "bg-surface-container-low text-primary border border-outline enabled:hover:brightness-90 focus:outline-primary box-border",
  outlined:
    "bg-transparent text-primary border border-outline enabled:hover:bg-primary-container focus:outline-primary box-border",
  text: "bg-transparent text-primary enabled:hover:bg-primary-container focus:outline-primary",
  danger:
    "bg-error-container text-on-error-container enabled:hover:brightness-90 focus:outline-error",
} as const;

// Create type from the object keys
export type ButtonVariant = keyof typeof BUTTON_VARIANTS;

interface ButtonProps {
  /** The text content of the button */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The visual style variant of the button */
  variant?: ButtonVariant;
  /** Icon to display before the label */
  startIcon?: ReactNode;
  /** Icon to display after the label */
  endIcon?: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const Button = ({
  label,
  onClick,
  disabled = false,
  variant = "filled",
  startIcon,
  endIcon,
  className,
}: ButtonProps) => {
  const variantClasses = BUTTON_VARIANTS[variant];

  const buttonClasses = clsx(
    variantClasses,
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      <Typography variant="labelBold">{label}</Typography>
    </ButtonBase>
  );
};

export default Button;
