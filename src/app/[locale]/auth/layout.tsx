"use client";

import React from "react";

import { useTelegram } from "@/hooks/useTelegram";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isWebApp, webApp } = useTelegram();

  if (isWebApp) {
    if (webApp) {
      webApp.showAlert("Auth, hey!");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary-content to-secondary">
      {children}
    </div>
  );
}
