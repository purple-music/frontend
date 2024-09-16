"use client";

import React, { useEffect } from "react";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { Booking } from "@/app/[lng]/my/booking/_components/booking";
import { PageWrapper } from "@/components/my/page-wrapper";
import { useTranslation } from "@/i18n/client";

function BookingWrapper() {
  const { session, status } = useCurrentSession();

  if (status === "loading") {
    // TODO: add skeleton
    return <span>TODO: Dashboard skeleton...</span>;
  }

  return <Booking />;
}

export default function BookingPage() {
  const { t } = useTranslation(undefined, "my");

  return (
    <PageWrapper title={t("booking.title")}>
      <BookingWrapper />
    </PageWrapper>
  );
}
