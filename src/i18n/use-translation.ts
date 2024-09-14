import { createInstance, i18n, InitOptions, TFunction } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

// Define the types for the initI18next function parameters
type InitI18nextParams = {
  lng: string;
  ns?: string;
};

// Define the types for useTranslation options
interface UseTranslationOptions {
  keyPrefix?: string;
}

// Initialize the i18next instance
const initI18next = async ({ lng, ns }: InitI18nextParams): Promise<i18n> => {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lng, ns) as InitOptions);

  return i18nInstance;
};

// useTranslation function with types
export async function useTranslation(
  lng: string,
  ns?: string,
  options: UseTranslationOptions = {},
): Promise<{ t: TFunction; i18n: i18n }> {
  const i18nextInstance = await initI18next({ lng, ns });

  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix,
    ),
    i18n: i18nextInstance,
  };
}
