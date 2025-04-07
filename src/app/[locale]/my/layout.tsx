import React from "react";

import { Namespace } from "@/app/i18n";
import WithTranslation from "@/components/shared/providers/TranslationsProvider";
import MyTemplate from "@/features/my/layout/MyTemplate/MyTemplate";

const Layout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) => {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  return (
    <WithTranslation locale={locale} namespaces={[Namespace.MY]}>
      <MyTemplate>{children}</MyTemplate>
    </WithTranslation>
  );
};

export default Layout;
