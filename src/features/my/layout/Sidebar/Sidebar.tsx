import Image from "next/image";
import { HTMLAttributes, ReactNode } from "react";

import Navbar, { NavbarButton } from "@/components/layout/Navbar/Navbar";
import UserProfile from "@/features/my/layout/UserProfile/UserProfile";

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
      className={`flex max-w-96 flex-col justify-between gap-8 ${className}`}
      {...props}
    >
      <div className="flex h-full max-w-96 flex-col gap-8">
        <Image
          width={512}
          height={512}
          src="/logo.webp"
          alt="Logo"
          className={"h-64 w-full rounded-[32px] object-cover"}
        />
        <Navbar buttons={buttons} defaultHref={defaultHref} />
      </div>
      <UserProfile />
    </div>
  );
};

export default Sidebar;
