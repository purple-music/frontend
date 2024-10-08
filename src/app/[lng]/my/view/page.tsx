"use client";

import React from "react";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";
import { PageWrapper } from "@/components/my/PageWrapper";
import { View } from "@/app/[lng]/my/view/_components/View";
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
