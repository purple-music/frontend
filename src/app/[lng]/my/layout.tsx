"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CurrentUser } from "@/components/my/CurrentUser";
import { useTranslation as useClientTranslation } from "@/i18n/client";
import { useTranslation as useServerTranslation } from "@/i18n/server";

function Sidebar() {
  const { t } = useClientTranslation(undefined, "my");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="drawer-side z-[10]">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <input
        type="checkbox"
        id="my-drawer"
        className="drawer-toggle"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="flex min-h-full w-80 flex-col justify-between gap-2 bg-base-100 p-2">
        <div className="flex flex-col gap-2">
          <Link
            className="h-48 w-full overflow-hidden rounded-xl text-center"
            href="/"
            onClick={() => setIsOpen(false)}
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
              <Link href="/my" onClick={() => setIsOpen(false)}>
                {t("dashboard.title")}
              </Link>
            </li>
            <li>
              <Link href="/my/booking" onClick={() => setIsOpen(false)}>
                {t("booking.title")}
              </Link>
            </li>
            <li>
              <Link href="/my/view" onClick={() => setIsOpen(false)}>
                {t("view.title")}
              </Link>
            </li>
          </ul>
        </div>
        <CurrentUser />
      </div>
    </nav>
  );
}

function Navbar() {
  const { t } = useClientTranslation(undefined, "common");
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
      <span className="mx-2 flex-1 px-2 text-xl">{t("company-name")}</span>
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
