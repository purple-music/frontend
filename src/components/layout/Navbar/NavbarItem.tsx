import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

import ButtonBase from "@/components/ui/ButtonBase/ButtonBase";

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
      className={clsx(
        {
          "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary z-10":
            isSelected,
          "bg-transparent text-on-surface enabled:hover:bg-surface-container-high focus:outline-outline":
            !isSelected,
        },
        "w-full px-8 h-14 min-w-14",
        "flex items-center gap-4",
        "focus:outline outline-offset-2 outline-4",
        "rounded-full",
        "duration-200 ease-out",
      )}
    >
      {icon}
      {children}
    </Link>
  );
};

export default NavbarItem;
