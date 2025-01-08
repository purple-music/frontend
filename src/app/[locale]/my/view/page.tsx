"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import { View } from "@/app/[locale]/my/view/_components/View";
import { PageWrapper } from "@/features/my/PageWrapper";
import ViewPage from "@/features/my/view/ViewPage/ViewPage";

// function ViewWrapper() {
//   const { session, status } = useCurrentSession();

//   if (status === "loading") {
//     // TODO: add skeleton
//     return <span>TODO: View skeleton...</span>;
//   }

//   return <View />;
// }

export default function Page() {
  const { t } = useTranslation("my");
  return (
    <>
      <ViewPage />
      {/* <PageWrapper title={t("view.title")}>
        <ViewWrapper />
      </PageWrapper> */}
    </>
  );
}
