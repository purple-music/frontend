import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

import Typography from "@/components/atoms/Typography/Typography";
import { NavbarButton } from "@/components/molecules/Navbar/Navbar";

interface NavbarItemProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  icon: ReactNode;
  isSelected?: boolean;
  href: string;
}

const NavbarItem = ({ children, icon, isSelected, href }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "w-full px-8 h-20",
        "flex flex-col justify-center items-center",
      )}
    >
      <div
        className={clsx(
          {
            "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary z-10":
              isSelected,
            "bg-transparent text-on-surface enabled:hover:bg-surface-container-high focus:outline-outline":
              !isSelected,
          },
          "flex flex-col justify-center items-center gap-1",
          "p-2 rounded-full w-16 h-8",
          "focus:outline outline-offset-2 outline-4",
          "rounded-full",
          "duration-200 ease-out",
        )}
      >
        {icon}
      </div>
      {children}
    </Link>
  );
};

export interface BottomNavbarProps extends HTMLAttributes<HTMLDivElement> {
  buttons: NavbarButton[];
}

const BottomNavbar = ({ buttons, className, ...props }: BottomNavbarProps) => {
  return (
    <div className={`sticky bottom-0 w-full ${className}`} {...props}>
      <div className="flex justify-between px-2 gap-2 bg-surface-container">
        {buttons.map((button) => (
          <NavbarItem
            key={button.href}
            href={button.href}
            icon={button.icon}
            isSelected={button.isSelected}
          >
            <Typography variant={"labelBold"}>{button.label}</Typography>
          </NavbarItem>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;
