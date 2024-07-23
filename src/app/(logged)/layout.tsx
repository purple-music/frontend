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

function Sidebar() {
  return (
    <nav className="drawer-side z-[10]">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
        <li>
          <a>Sidebar Item 1</a>
        </li>
        <li>
          <a>Sidebar Item 2</a>
        </li>
        <CurrentUser />
      </ul>
    </nav>
  );
}

function Navbar() {
  return (
    <div className="navbar w-full bg-base-300 lg:hidden">
      <div className="flex-none">
        <label
          htmlFor="my-drawer"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">Purple Studio</div>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container drawer lg:drawer-open lg:gap-8">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <Sidebar />
      <div className="drawer-content">
        <Navbar />
        <main>{children}</main>
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          Open drawer
        </label>
      </div>
    </div>
  );
}
