import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

import NavbarItem from "@/components/layout/Navbar/NavbarItem";
import Typography from "@/components/ui/Typography/Typography";

export type NavbarButton = {
  label: string;
  href: string;
  icon: ReactNode;
  isSelected?: boolean;
};

interface NavbarProps {
  buttons: NavbarButton[];
  defaultHref?: string;
}

const Navbar = ({ buttons }: NavbarProps) => {
  return (
    <nav className="inline-flex w-96 flex-col items-center justify-center rounded-[28px] bg-surface-container">
      {buttons.map(({ label, href, isSelected }, index) => (
        <NavbarItem
          icon={buttons[index].icon}
          key={href}
          href={href}
          isSelected={isSelected}
        >
          <Typography variant="label" size={"large"} component="span">
            {label}
          </Typography>
        </NavbarItem>
      ))}
    </nav>
  );
};

export default Navbar;
