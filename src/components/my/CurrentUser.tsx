"use client";

import { logout } from "@/actions/mutation/logout";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";

export function CurrentUser() {
  const { session, status } = useCurrentSession();

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          logout();
        }}
      >
        <button className="btn btn-outline btn-sm mt-2" type="submit">
          Выйти
        </button>
      </form>
    </div>
  );
}
