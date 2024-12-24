import { router } from "next/client";
import Image from "next/image";
import { HTMLAttributes } from "react";

import { logout } from "@/actions/mutation/logout";
import Typography from "@/components/atoms/Typography/Typography";

export interface TopAppBarProps extends HTMLAttributes<HTMLDivElement> {}

const TopAppBar = ({ className, ...props }: TopAppBarProps) => {
  const handleLogout = async () => {
    await logout();
    await router.push("/auth");
  };
  return (
    <div
      className={`sticky top-0 w-full h-16 bg-surface-container ${className} z-50 flex items-center justify-center flex-row px-4`}
      {...props}
    >
      <div className="flex items-center justify-start">
        <Image src="/logo.webp" alt="Logo" width={32} height={32} />
      </div>
      <div className="flex-1 flex items-center justify-center">
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
          className="w-12 h-12 rounded-full"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default TopAppBar;
