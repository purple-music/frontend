import { createInstance, i18n } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import i18nConfig from "@/i18nConfig";

export type InitTranslationsResult = {
  i18n: i18n;
  resources: Record<string, any>;
  t: i18n["t"];
};

export const Namespace = {
  INDEX: "index",
  COMMON: "common",
  AUTH: "auth",
  MY: "my",
};

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Record<string, any>,
): Promise<InitTranslationsResult> {
  const instance = i18nInstance || createInstance();

  instance.use(initReactI18next);

  if (!resources) {
    instance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`),
      ),
    );
  }

  await instance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: instance,
    resources: instance.services.resourceStore.data,
    t: instance.t,
  };
}
