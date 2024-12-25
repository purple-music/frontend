import nextTranslate from "next-translate-plugin";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  // nextTranslate: {
  //   locales: ["en", "ru"],
  //   defaultLocale: "en",
  //   localeDetection: false,
  // },
  // i18n: {
  //   locales: ["en", "ru"],
  //   defaultLocale: "en",
  //   // localeDetection: false,
  // },
  // trailingSlash: true,
};

export default nextTranslate(nextConfig);
