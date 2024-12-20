import clsx from "clsx";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

import { User } from "@prisma/client";

import { logout } from "@/actions/mutation/logout";
import { getUserByEmail } from "@/actions/query/user";
import IconButton from "@/components/atoms/IconButton/IconButton";
import Typography from "@/components/atoms/Typography/Typography";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";

const UserProfile = () => {
  const session = useCurrentSession();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!session.session) return;
    getUserByEmail(session.session.user.email).then((response) =>
      setUser(response),
    );
  }, [session]);

  if (session.status === "loading") return <span>Loading...</span>;
  if (!user) return <span>Loading...</span>;
  return (
    <div
      className={clsx(
        "flex items-start gap-4",
        "bg-surface-container-high rounded-[32px] p-4",
      )}
    >
      <div className="w-16 h-16 rounded-full">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile Picture"}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-surface-container-highest" />
        )}
      </div>
      <div className="flex flex-col flex-1">
        <Typography variant="title">{user.name}</Typography>
        <Typography variant="label">{user.email}</Typography>
      </div>
      <IconButton variant={"text"} onClick={() => logout()}>
        <FaEllipsisVertical size={24} />
      </IconButton>
    </div>
  );
};

export default UserProfile;
