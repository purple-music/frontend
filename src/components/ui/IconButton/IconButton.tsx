import clsx from "clsx";
import { ReactNode } from "react";

import Button, {
  BUTTON_VARIANTS,
  ButtonVariant,
} from "@/components/ui/Button/Button";
import ButtonBase from "@/components/ui/ButtonBase/ButtonBase";
import Typography from "@/components/ui/Typography/Typography";

interface IconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  children?: ReactNode;
  size?: "sm" | "md";
}

const IconButton = ({
  onClick,
  disabled = false,
  variant = "filled",
  children,
  size = "md",
}: IconButtonProps) => {
  const variantClasses = BUTTON_VARIANTS[variant];

  const buttonClasses = clsx(
    variantClasses,
    disabled && "opacity-50 cursor-not-allowed",
  );

  return (
    <ButtonBase
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      startIcon={children}
      width={"squared"}
      size={size}
    ></ButtonBase>
  );
};

export default IconButton;
