"use client";

import React, { useEffect } from "react";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { Booking } from "@/app/[lng]/my/booking/_components/booking";
import { PageWrapper } from "@/components/my/page-wrapper";

function BookingWrapper() {
  const { session, status } = useCurrentSession();

  if (status === "loading") {
    // TODO: add skeleton
    return <span>TODO: Dashboard skeleton...</span>;
  }

  return <Booking />;
}

export default function BookingPage() {
  return (
    <PageWrapper title="Бронирование">
      <BookingWrapper />
    </PageWrapper>
  );
}
