import clsx from "clsx";
import Image from "next/image";
import { FaEllipsisVertical } from "react-icons/fa6";

import { useProfileQuery } from "@/api/queries/auth/profile";
import IconButton from "@/components/ui/IconButton/IconButton";
import Typography from "@/components/ui/Typography/Typography";
import ProfileModal from "@/features/my/layout/ProfileModal/ProfileModal";

interface UserProfileProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

const UserProfile = ({ isModalOpen, setIsModalOpen }: UserProfileProps) => {
  const { data: user, isLoading, isError, error } = useProfileQuery();

  if (isError) return <span>Error: {error?.message}</span>;
  if (isLoading) return <span>Loading...</span>;
  if (!user) return <span>No user</span>;

  return (
    <div
      className={clsx(
        "flex items-start gap-4",
        "rounded-[32px] bg-surface-container-high p-4",
      )}
    >
      <div className="h-16 w-16 rounded-full">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile Picture"}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-surface-container-highest" />
        )}
      </div>
      <div className="flex flex-1 flex-col">
        <Typography variant="title">{user.name}</Typography>
        <Typography variant="label">{user.email}</Typography>
      </div>
      <IconButton variant={"text"} onClick={() => setIsModalOpen(true)}>
        <FaEllipsisVertical size={24} />
      </IconButton>
      <ProfileModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default UserProfile;
