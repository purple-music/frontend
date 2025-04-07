import React from "react";

import { Namespace } from "@/app/i18n";
import WithTranslation from "@/components/shared/providers/TranslationsProvider";
import LoginForm from "@/features/auth/LoginForm";

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  return (
    <WithTranslation locale={locale} namespaces={[Namespace.AUTH]}>
      <LoginForm backendUrl={backendUrl} />
    </WithTranslation>
  );
}
