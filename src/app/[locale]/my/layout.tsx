"use client";

import React from "react";

import MyTemplate from "@/components/templates/MyTemplate/MyTemplate";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <MyTemplate>{children}</MyTemplate>;
};

export default Layout;
