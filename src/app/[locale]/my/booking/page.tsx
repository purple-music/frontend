"use client";

import { useTranslations } from "next-intl";
import React, { useEffect } from "react";

import { Booking } from "@/app/[locale]/my/booking/_components/Booking";
import { PageWrapper } from "@/components/my/PageWrapper";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";

function BookingWrapper() {
  const { session, status } = useCurrentSession();

  if (status === "loading") {
    // TODO: add skeleton
    return <span>TODO: Dashboard skeleton...</span>;
  }

  return <Booking />;
}

export default function BookingPage() {
  const t = useTranslations("my");

  return (
    <PageWrapper title={t("booking.title")}>
      <BookingWrapper />
    </PageWrapper>
  );
}
