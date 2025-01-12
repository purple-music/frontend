import { router } from "next/client";
import Image from "next/image";
import { HTMLAttributes } from "react";

import { logout } from "@/actions/mutation/logout";
import Typography from "@/components/ui/Typography/Typography";

export interface TopAppBarProps extends HTMLAttributes<HTMLDivElement> {}

const TopAppBar = ({ className, ...props }: TopAppBarProps) => {
  const handleLogout = async () => {
    await logout();
    await router.push("/auth");
  };
  return (
    <div
      className={`sticky top-0 h-16 w-full bg-surface-container ${className} z-10 flex flex-row items-center justify-center px-4`}
      {...props}
    >
      <div className="flex items-center justify-start">
        <Image src="/logo.webp" alt="Logo" width={32} height={32} />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Typography variant={"title"} size="large">
          Purple Studio
        </Typography>
      </div>
      <div className="flex items-center justify-end">
        <Image
          width={48}
          height={48}
          layout="fixed"
          src={"/pfp.jpg"}
          alt="Profile Picture"
          className="h-12 w-12 rounded-full"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default TopAppBar;
