"use client";

import { createInstance } from "i18next";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import initTranslations from "@/app/i18n";

/**
 * Provides translations, but makes all children components client components
 * So, scope it as close as possible to the translations
 * @param children
 * @param locale
 * @param namespaces
 * @param resources
 * @constructor
 */
export default function WithTranslation({
  children,
  locale,
  namespaces,
  resources,
}: Readonly<{
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Record<string, any>;
}>) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
