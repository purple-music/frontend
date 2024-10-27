import clsx from "clsx";
import { ReactNode } from "react";

import Typography from "@/components/atoms/Typography/Typography";

interface UserProfileProps {
  profilePicture: ReactNode;
  name: string;
  email: string;
}

const UserProfile = ({ profilePicture, name, email }: UserProfileProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-4",
        "bg-surface-container-high rounded-[28px] p-4",
      )}
    >
      <div className="w-16 h-16 rounded-full">{profilePicture}</div>
      <div className="flex flex-col">
        <Typography variant="title">{name}</Typography>
        <Typography variant="label">{email}</Typography>
      </div>
    </div>
  );
};

export default UserProfile;
