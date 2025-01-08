"use client";

import { notFound, usePathname } from "next/navigation";
import React from "react";

import MyTemplate, { MyPage } from "@/features/my/MyTemplate/MyTemplate";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Extract the relevant part of the pathname
  const pageFromPath = pathname.split("/")[3] || "";

  // Define allowed pages as a set for quick lookup
  const validPages: Record<string, MyPage> = {
    "": "",
    view: "view",
    booking: "booking",
  };

  // Match the page or trigger a 404
  const page = validPages[pageFromPath];
  if (page === undefined) {
    notFound();
  }

  return <MyTemplate page={page}>{children}</MyTemplate>;
};

export default Layout;
