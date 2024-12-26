// import { getRequestConfig } from "next-intl/server";
//
// import { routing } from "./routing";
//
// export default getRequestConfig(async ({ requestLocale }) => {
//   // This typically corresponds to the `[locale]` segment
//   let locale = await requestLocale;
//
//   console.log("===> request.ts: locale", locale);
//
//   // Ensure that a valid locale is used
//   if (!locale || !routing.locales.includes(locale as any)) {
//     console.log("===> request.ts: Invalid locale", locale);
//     locale = routing.defaultLocale;
//   }
//
//   console.log(
//     "importing locales:",
//     (await import(`../../messages/${locale}.json`)).default,
//   );
//
//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default,
//   };
// });
