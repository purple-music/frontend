import clsx from "clsx";
import { ReactNode } from "react";

import ButtonBase from "@/components/atoms/ButtonBase/ButtonBase";

interface NavbarItemProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
}

const NavbarItem = ({
  children,
  icon,
  onClick,
  isSelected,
}: NavbarItemProps) => {
  return (
    <ButtonBase
      startIcon={icon}
      width="full"
      size="xl"
      type="button"
      onClick={onClick}
      className={clsx({
        "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary z-10":
          isSelected,
        "bg-transparent text-on-surface enabled:hover:bg-surface-container-high focus:outline-outline":
          !isSelected,
      })}
    >
      {children}
    </ButtonBase>
  );
};

export default NavbarItem;
