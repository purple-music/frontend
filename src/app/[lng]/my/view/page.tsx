"use client";

import React from "react";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { Booking } from "@/app/[lng]/my/booking/_components/booking";
import { PageWrapper } from "@/components/my/page-wrapper";
import { View } from "@/app/[lng]/my/view/_components/view";
import { useTranslation } from "@/i18n/client";

function ViewWrapper() {
  const { session, status } = useCurrentSession();

  if (status === "loading") {
    // TODO: add skeleton
    return <span>TODO: View skeleton...</span>;
  }

  return <View />;
}

export default function BookingPage() {
  const { t } = useTranslation(undefined, "my");
  return (
    <PageWrapper title={t("view.title")}>
      <ViewWrapper />
    </PageWrapper>
  );
}
