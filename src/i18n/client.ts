// "use client";

// import i18next, { TFunction, i18n } from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
// import resourcesToBackend from "i18next-resources-to-backend";
// import { useEffect, useState } from "react";
// import { useCookies } from "react-cookie";
// import {
//   initReactI18next,
//   useTranslation as useTranslationOrg,
// } from "react-i18next";

// import { cookieName, getOptions, languages } from "./settings";

// const runsOnServerSide = typeof window === "undefined";

// // Define the types for the initI18next function parameters
// type InitI18nextParams = {
//   lng: string;
//   ns?: string;
// };

// // Define the types for useTranslation options
// interface UseTranslationOptions {
//   keyPrefix?: string;
// }

// // Initialize the i18next instance
// i18next
//   .use(initReactI18next)
//   .use(LanguageDetector)
//   .use(
//     resourcesToBackend(
//       (language: string, namespace: string) =>
//         import(`./locales/${language}/${namespace}.json`),
//     ),
//   )
//   .init({
//     ...getOptions(),
//     lng: undefined, // let detect the language on client side
//     detection: {
//       order: ["path", "htmlTag", "cookie", "navigator"],
//     },
//     preload: runsOnServerSide ? languages : [],
//   });

// export function useTranslation(
//   lng?: string,
//   ns?: string,
//   options: UseTranslationOptions = {},
// ): { t: TFunction; i18n: i18n } {
//   const [cookies, setCookie] = useCookies([cookieName]);
//   const [activeLng, setActiveLng] = useState<string | undefined>(
//     i18next.resolvedLanguage,
//   );

//   // Call the original react-i18next useTranslation hook unconditionally
//   const ret = useTranslationOrg(ns, options);
//   const { i18n } = ret;

//   // Always set the language on the client-side, but manage effects based on conditions
//   useEffect(() => {
//     if (activeLng === i18n.resolvedLanguage) return;
//     setActiveLng(i18n.resolvedLanguage);
//   }, [activeLng, i18n.resolvedLanguage]);

//   useEffect(() => {
//     if (!lng || i18n.resolvedLanguage === lng) return;
//     i18n.changeLanguage(lng);
//   }, [lng, i18n]);

//   useEffect(() => {
//     if (cookies.i18next === lng) return;
//     setCookie(cookieName, lng, { path: "/" });
//   }, [lng, cookies.i18next]);

//   // On server-side, force language change (this will only trigger on server)
//   if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
//     i18n.changeLanguage(lng);
//   }

//   // Return the translation function `t` and i18next instance `i18n`
//   return ret;
// }

