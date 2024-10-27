import clsx from "clsx";
import { ReactNode } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

import IconButton from "@/components/atoms/IconButton/IconButton";
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
        "flex items-start gap-4",
        "bg-surface-container-high rounded-[28px] p-4",
      )}
    >
      <div className="w-16 h-16 rounded-full">{profilePicture}</div>
      <div className="flex flex-col flex-1">
        <Typography variant="title">{name}</Typography>
        <Typography variant="label">{email}</Typography>
      </div>
      <IconButton variant={"text"}>
        <FaEllipsisVertical size={24} />
      </IconButton>
    </div>
  );
};

export default UserProfile;

