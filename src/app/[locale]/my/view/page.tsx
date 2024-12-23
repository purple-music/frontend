"use client";

import { useTranslations } from "next-intl";
import React from "react";

import { View } from "@/app/[locale]/my/view/_components/View";
import { PageWrapper } from "@/components/my/PageWrapper";
import ViewPage from "@/components/pages/ViewPage/ViewPage";

// function ViewWrapper() {
//   const { session, status } = useCurrentSession();

//   if (status === "loading") {
//     // TODO: add skeleton
//     return <span>TODO: View skeleton...</span>;
//   }

//   return <View />;
// }

export default function Page() {
  const t = useTranslations("my");
  return (
    <>
      <ViewPage />
      {/* <PageWrapper title={t("view.title")}>
        <ViewWrapper />
      </PageWrapper> */}
    </>
  );
}
