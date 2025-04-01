import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export type Hour = number;

export type StudioId = "blue" | "purple" | "orange";

export type ActionResult = {
  type: "success" | "error";
  message: string;
};

export interface I18nConfig {
  locales: readonly string[];
  defaultLocale: string;
  localeCookie?: string;
  prefixDefault?: boolean;
  basePath?: string;
  serverSetCookie?: "if-empty" | "always" | "never";
  cookieOptions?: Partial<ResponseCookie>;
}
