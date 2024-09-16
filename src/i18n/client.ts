"use client";

import { useEffect, useState } from "react";
import i18next, { TFunction, i18n } from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import { useCookies } from "react-cookie";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions, languages, cookieName } from "./settings";

const runsOnServerSide = typeof window === "undefined";

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
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    ...getOptions(),
    lng: undefined, // let detect the language on client side
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? languages : [],
  });

export function useTranslation(
  lng?: string,
  ns?: string,
  options: UseTranslationOptions = {},
): { t: TFunction; i18n: i18n } {
  const [cookies, setCookie] = useCookies([cookieName]);

  // Call the original react-i18next useTranslation hook
  const ret = useTranslationOrg(ns, options);
  const { i18n } = ret;

  // Server-side language change if different language is detected
  if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng);
  } else {
    // Client-side: useState to track the active language
    const [activeLng, setActiveLng] = useState<string | undefined>(
      i18n.resolvedLanguage,
    );

    // useEffect to update the activeLng state when i18n language changes
    useEffect(() => {
      if (activeLng === i18n.resolvedLanguage) return;
      setActiveLng(i18n.resolvedLanguage);
    }, [activeLng, i18n.resolvedLanguage]);

    // useEffect to change the language if the provided `lng` is different
    useEffect(() => {
      if (!lng || i18n.resolvedLanguage === lng) return;
      i18n.changeLanguage(lng);
    }, [lng, i18n]);

    // useEffect to update the language cookie when language changes
    useEffect(() => {
      if (cookies.i18next === lng) return;
      setCookie(cookieName, lng, { path: "/" });
    }, [lng, cookies.i18next]);
  }

  // Return the translation function `t` and i18next instance `i18n`
  return ret;
}
