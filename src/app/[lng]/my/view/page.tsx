"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { View } from "@/app/[lng]/my/view/_components/View";
import { PageWrapper } from "@/components/my/PageWrapper";
import { useCurrentSession } from "@/lib/hooks/useCurrentSession";

function ViewWrapper() {
  const { session, status } = useCurrentSession();

  if (status === "loading") {
    // TODO: add skeleton
    return <span>TODO: View skeleton...</span>;
  }

  return <View />;
}

export default function BookingPage() {
  const t = useTranslations("my");
  return (
    <PageWrapper title={t("view.title")}>
      <ViewWrapper />
    </PageWrapper>
  );
}

