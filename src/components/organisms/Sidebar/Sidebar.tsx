import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";

import Navbar, { NavbarButton } from "@/components/molecules/Navbar/Navbar";
import UserProfile from "@/components/molecules/UserProfile/UserProfile";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  buttons: NavbarButton[];
  defaultHref?: string;
}

const Sidebar = ({
  buttons,
  defaultHref,
  className,
  ...props
}: SidebarProps) => {
  return (
    <div
      className={`flex flex-col gap-8 max-w-96 justify-between ${className}`}
      {...props}
    >
      <div className="flex flex-col gap-8 max-w-96 h-full">
        <Image
          width={512}
          height={512}
          src="/logo.webp"
          alt="Logo"
          className={"w-full h-64 rounded-[32px] object-cover"}
        />
        <Navbar buttons={buttons} defaultHref={defaultHref} />
      </div>
      <UserProfile
        profilePicture={
          <Image
            width={64}
            height={64}
            layout="fixed"
            src={"/logo.webp"}
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
