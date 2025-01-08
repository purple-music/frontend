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
          "z-10 bg-secondary-container text-on-secondary-container focus:outline-secondary enabled:hover:brightness-90":
            isSelected,
          "bg-transparent text-on-surface focus:outline-outline enabled:hover:bg-surface-container-high":
            !isSelected,
        },
        "h-14 w-full min-w-14 px-8",
        "flex items-center gap-4",
        "outline-4 outline-offset-2 focus:outline",
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
