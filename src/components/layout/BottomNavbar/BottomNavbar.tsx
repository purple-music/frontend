import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

import { NavbarButton } from "@/components/layout/Navbar/Navbar";
import Typography from "@/components/ui/Typography/Typography";

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
        "h-20 w-full px-8",
        "flex flex-col items-center justify-center",
      )}
    >
      <div
        className={clsx(
          {
            "z-10 bg-secondary-container text-on-secondary-container focus:outline-secondary enabled:hover:brightness-90":
              isSelected,
            "bg-transparent text-on-surface focus:outline-outline enabled:hover:bg-surface-container-high":
              !isSelected,
          },
          "flex flex-col items-center justify-center gap-1",
          "h-8 w-16 rounded-full p-2",
          "outline-4 outline-offset-2 focus:outline",
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
      <div className="flex justify-between gap-2 bg-surface-container px-2">
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
