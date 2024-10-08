"use client";

import React, { useEffect, useState } from "react";
import { PageWrapper } from "@/components/my/PageWrapper";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { Dashboard } from "@/components/my/Dashboard";
import { getCurrentBookingsByUserId } from "@/actions/query/booking";
import { Booking } from "@prisma/client";
import { useTranslation } from "@/i18n/client";

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
  const { t } = useTranslation(undefined, "my");
  return (
    <PageWrapper title={t("dashboard.title")}>
      <DashboardWrapper />
    </PageWrapper>
  );
}
