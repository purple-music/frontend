"use client";

import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { fetchCurrentUser } from "@/actions/actions";

function CurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user") || "";
    fetchCurrentUser(userId).then(setUser);
  }, []);

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div>
      <p>Logged in as: {user.email}</p>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <CurrentUser />
      {children}
    </section>
  );
}
