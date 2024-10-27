import clsx from "clsx";
import { ReactNode } from "react";

import Button, { BUTTON_VARIANTS } from "../Button/Button";
import ButtonBase from "../ButtonBase/ButtonBase";
import Typography from "../Typography/Typography";

interface IconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "filled" | "tonal" | "elevated" | "outlined" | "text";
  children?: ReactNode;
}

const IconButton = ({
  onClick,
  disabled = false,
  variant = "filled",
  children,
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
    ></ButtonBase>
  );
};

export default IconButton;

