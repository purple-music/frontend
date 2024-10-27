import clsx from "clsx";
import Image from "next/image";
import { ReactNode, useState } from "react";

import Typography from "@/components/atoms/Typography/Typography";
import Navbar from "@/components/molecules/Navbar/Navbar";
import NavbarItem from "@/components/molecules/Navbar/NavbarItem";
import UserProfile from "@/components/molecules/UserProfile/UserProfile";

interface SidebarProps {
  buttons: { label: string; value: string; icon?: ReactNode }[];
  defaultValue?: string;
  onClick?: (value: string) => void;
}

const Sidebar = ({ buttons, defaultValue, onClick }: SidebarProps) => {
  return (
    <div className="flex flex-col gap-8 max-w-96 justify-between">
      <div className="flex flex-col gap-8 max-w-96 h-full">
        <Image
          width={0}
          height={0}
          src="/logo.webp"
          alt="Logo"
          className={"w-full h-auto rounded-[28px]"}
        />
        <Navbar
          buttons={buttons}
          defaultValue={defaultValue}
          onClick={onClick}
        />
      </div>
      <UserProfile
        profilePicture={
          <Image
            width={64}
            height={64}
            layout="fixed"
            src={"logo.webp"}
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />
        }
        name={"John Doe"}
        email={"jdoe@me.com"}
      />
    </div>
  );
};

export default Sidebar;
