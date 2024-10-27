import clsx from "clsx";
import Image from "next/image";
import { ReactNode, useState } from "react";

import Typography from "@/components/atoms/Typography/Typography";
import Navbar from "@/components/molecules/Navbar/Navbar";
import NavbarItem from "@/components/molecules/Navbar/NavbarItem";

interface SidebarProps {
  buttons: { label: string; value: string; icon?: ReactNode }[];
  defaultValue?: string;
  onClick?: (value: string) => void;
}

const Sidebar = ({ buttons, defaultValue, onClick }: SidebarProps) => {
  return (
    <div className="flex flex-col gap-4 max-w-96">
      <Image
        width={0}
        height={0}
        src="/logo.webp"
        alt="Logo"
        className={"w-full h-auto rounded-[28px]"}
      />
      <Navbar buttons={buttons} defaultValue={defaultValue} onClick={onClick} />
    </div>
  );
};

export default Sidebar;
