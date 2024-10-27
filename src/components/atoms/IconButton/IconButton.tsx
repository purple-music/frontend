import clsx from "clsx";
import { ReactNode } from "react";

import Button from "../Button/Button";
import ButtonBase from "../ButtonBase/ButtonBase";
import Typography from "../Typography/Typography";

interface IconButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "filled" | "tonal" | "elevated" | "outlined" | "text";
  icon?: ReactNode;
  className?: string;
}

const IconButton = ({
  onClick,
  disabled = false,
  variant = "filled",
  icon,
  className,
}: IconButtonProps) => {
  return (
    <Button
      startIcon={icon}
      onClick={onClick}
      disabled={disabled}
      squared={true}
      variant={variant}
    ></Button>
  );
};

export default IconButton;
