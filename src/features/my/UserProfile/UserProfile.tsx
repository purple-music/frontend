import clsx from "clsx";
import { router } from "next/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

import { User } from "@prisma/client";

import { logout } from "@/actions/mutation/logout";
import { getUserByEmail } from "@/actions/query/user";
import IconButton from "@/components/ui/IconButton/IconButton";
import Typography from "@/components/ui/Typography/Typography";
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

  const handleLogout = async () => {
    await logout(); // Call the server function
    await router.push("/auth"); // Redirect to the auth/login page
  };

  if (session.status === "loading") return <span>Loading...</span>;
  if (!user) return <span>Loading...</span>;
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
      <IconButton variant={"text"} onClick={handleLogout}>
        <FaEllipsisVertical size={24} />
      </IconButton>
    </div>
  );
};

export default UserProfile;
