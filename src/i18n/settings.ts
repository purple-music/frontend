export const fallbackLocale = "en";
export const locales = [fallbackLocale, "ru"];
export const cookieName = "nextIntlLocale";

export function getOptions(locale = fallbackLocale) {
  return {
    // debug: true,
    supportedLocales: locales,
    fallbackLocale,
    locale,
  };
}
