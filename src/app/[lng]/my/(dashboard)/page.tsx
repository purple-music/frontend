"use client";

import React, { useEffect, useState } from "react";
import { PageWrapper } from "@/components/my/page-wrapper";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { Dashboard } from "@/components/my/dashboard";
import { getCurrentBookingsByUserId } from "@/actions/query/booking";
import { Booking } from "@prisma/client";

function DashboardWrapper() {
  const { session, status } = useCurrentSession();

  const [bookings, setBookings] = useState<Booking[] | null>(null);
  useEffect(() => {
    if (!session) return;

    getCurrentBookingsByUserId(session.user.id).then((response) =>
      setBookings(response),
    );
  }, [session]);

  if (status === "loading" || bookings === null) {
    // TODO: add skeleton
    return <span>TODO: Dashboard skeleton...</span>;
  }

  return <Dashboard bookings={bookings} />;
}

export default function DashboardPage() {
  return (
    <PageWrapper title="Дашборд">
      <DashboardWrapper />
    </PageWrapper>
  );
}
