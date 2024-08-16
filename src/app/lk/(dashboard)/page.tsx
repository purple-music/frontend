"use client";

import React from "react";
import { PageWrapper } from "@/components/lk/page-wrapper";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { Dashboard } from "@/components/lk/dashboard";

function DashboardWrapper() {
  const { session, status } = useCurrentSession();

  if (status === "loading") {
    // TODO: add skeleton
    return <span>TODO: Dashboard skeleton...</span>;
  }

  return <Dashboard session={session} />;
}

export default function DashboardPage() {
  return (
    <PageWrapper title="Дашборд">
      <DashboardWrapper />
    </PageWrapper>
  );
}
