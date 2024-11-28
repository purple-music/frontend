import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";

import Typography from "@/components/atoms/Typography/Typography";
import NavbarItem from "@/components/molecules/Navbar/NavbarItem";

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
    <nav className="inline-flex items-center justify-center flex-col rounded-[28px] bg-surface-container w-96">
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
