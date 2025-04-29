import Image from "next/image";
import { HTMLAttributes } from "react";

import Typography from "@/components/ui/Typography/Typography";
import ProfileModal from "@/features/my/layout/ProfileModal/ProfileModal";

export interface TopAppBarProps extends HTMLAttributes<HTMLDivElement> {
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (value: boolean) => void;
}

const TopAppBar = ({
  className,
  isProfileModalOpen,
  setIsProfileModalOpen,
  ...props
}: TopAppBarProps) => {
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
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open profile menu"
          aria-haspopup="dialog"
          aria-expanded={isProfileModalOpen}
        >
          <Image
            width={48}
            height={48}
            layout="fixed"
            src={"/pfp.jpg"}
            alt="Profile Picture"
            className="h-12 w-12 rounded-full"
          />
        </button>
        <ProfileModal
          isOpen={isProfileModalOpen}
          setIsOpen={setIsProfileModalOpen}
        />
      </div>
    </div>
  );
};

export default TopAppBar;
