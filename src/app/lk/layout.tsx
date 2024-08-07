"use client";

import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { getUserById } from "@/actions/query/user";
import Image from "next/image";
import Link from "next/link";

function CurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("user") || "";
    getUserById(userId).then(setUser);
  }, []);

  if (!user) {
    return <p>No user logged in</p>;
  }

  return (
    <div className="rounded-xl bg-base-200 p-4">
      <p className="font-bold">Вошли как:</p>
      <p>{user.email}</p>
      <button className="btn btn-outline btn-sm mt-2">Выйти</button>
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
      <div className="flex min-h-full w-80 flex-col justify-between gap-2 bg-base-100 p-2">
        <div className="flex flex-col gap-2">
          <Link
            className="h-48 w-full overflow-hidden rounded-xl text-center"
            href="/"
          >
            <Image
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src="/logo.webp"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </Link>
          <ul className="menu rounded-xl bg-base-200 text-base-content">
            <li>
              <Link href="/lk">Дашборд</Link>
            </li>
            <li>
              <Link href="/lk/booking">Бронирование</Link>
            </li>
            <li>
              <Link href="/lk/view">Просмотр</Link>
            </li>
          </ul>
        </div>
        <CurrentUser />
      </div>
    </nav>
  );
}

function Navbar() {
  return (
    <div className="navbar sticky top-4 z-[5] w-full rounded-full bg-primary-content lg:hidden">
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
      <span className="mx-2 flex-1 px-2 text-xl">Purple Studio</span>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="drawer-container container drawer lg:drawer-open lg:gap-8">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <Sidebar />
      <div className="drawer-content flex min-h-screen flex-col p-4 lg:p-0">
        <Navbar />
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  );
}
