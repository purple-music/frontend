"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

import { Booking } from "@prisma/client";

import { getCurrentBookingsByUserId } from "@/actions/query/booking";
import { Dashboard } from "@/components/my/Dashboard";
import { PageWrapper } from "@/components/my/PageWrapper";
import DashboardPage from "@/components/pages/DashboardPage/DashboardPage";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";

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

export default function Page() {
  const t = useTranslations("my");
  return (
    <>
      <DashboardPage />
      {/*<PageWrapper title={t("dashboard.title")}>*/}
      {/*  <DashboardWrapper />*/}
      {/*</PageWrapper>*/}
    </>
  );
}
