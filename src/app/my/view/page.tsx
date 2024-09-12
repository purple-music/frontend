"use client";

import React from "react";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { Booking } from "@/app/my/booking/_components/booking";
import { PageWrapper } from "@/components/my/page-wrapper";
import { View } from "@/app/my/view/_components/view";

function ViewWrapper() {
  const { session, status } = useCurrentSession();

  if (status === "loading") {
    // TODO: add skeleton
    return <span>TODO: View skeleton...</span>;
  }

  return <View />;
}

export default function BookingPage() {
  return (
    <PageWrapper title="Просмотр">
      <ViewWrapper />
    </PageWrapper>
  );
}
