"use client";

import { logout } from "@/actions/mutation/logout";
import { useSession } from "next-auth/react";

export function CurrentUser() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // TODO: The user is not authenticated, handle it here.
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    // TODO: configure logging system to catch such unexpected cases
    return <p>No session logged in</p>;
  }

  if (!session.user) {
    return <p>No user logged in</p>;
  }

  return (
    <div className="rounded-xl bg-base-200 p-4">
      <p className="font-bold">Вошли как:</p>
      <p>Welcome {session.user.email}</p>
      <form action={async () => logout()}>
        <button className="btn btn-outline btn-sm mt-2" type="submit">
          Выйти
        </button>
      </form>
    </div>
  );
}
