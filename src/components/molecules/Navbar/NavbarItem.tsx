import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

import ButtonBase from "@/components/atoms/ButtonBase/ButtonBase";

interface NavbarItemProps {
  children: ReactNode;
  icon?: ReactNode;
  isSelected?: boolean;
  href: string;
}

const NavbarItem = ({ children, icon, isSelected, href }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className={clsx({
        "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary z-10":
          isSelected,
        "bg-transparent text-on-surface enabled:hover:bg-surface-container-high focus:outline-outline":
          !isSelected,
      })}
    >
      {children}
      <ButtonBase startIcon={icon} width="full" size="xl" type="button">
        {children}
      </ButtonBase>
    </Link>
  );
};

export default NavbarItem;
