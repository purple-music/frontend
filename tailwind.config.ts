import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--md-sys-color-primary)",
        "on-primary": "var(--md-sys-color-on-primary)",
        "primary-container": "var(--md-sys-color-primary-container)",
        "on-primary-container": "var(--md-sys-color-on-primary-container)",

        secondary: "var(--md-sys-color-secondary)",
        "on-secondary": "var(--md-sys-color-on-secondary)",
        "secondary-container": "var(--md-sys-color-secondary-container)",
        "on-secondary-container": "var(--md-sys-color-on-secondary-container)",

        tertiary: "var(--md-sys-color-tertiary)",
        "on-tertiary": "var(--md-sys-color-on-tertiary)",
        "tertiary-container": "var(--md-sys-color-tertiary-container)",
        "on-tertiary-container": "var(--md-sys-color-on-tertiary-container)",

        error: "var(--md-sys-color-error)",
        "on-error": "var(--md-sys-color-on-error)",
        "error-container": "var(--md-sys-color-error-container)",
        "on-error-container": "var(--md-sys-color-on-error-container)",

        background: "var(--md-sys-color-background)",
        "on-background": "var(--md-sys-color-on-background)",

        surface: "var(--md-sys-color-surface)",
        "on-surface": "var(--md-sys-color-on-surface)",
        "surface-variant": "var(--md-sys-color-surface-variant)",
        "on-surface-variant": "var(--md-sys-color-on-surface-variant)",
        "surface-tint": "var(--md-sys-color-surface-tint)",

        outline: "var(--md-sys-color-outline)",
        "outline-variant": "var(--md-sys-color-outline-variant)",

        shadow: "var(--md-sys-color-shadow)",
        scrim: "var(--md-sys-color-scrim)",

        "inverse-surface": "var(--md-sys-color-inverse-surface)",
        "inverse-on-surface": "var(--md-sys-color-inverse-on-surface)",
        "inverse-primary": "var(--md-sys-color-inverse-primary)",

        "primary-fixed": "var(--md-sys-color-primary-fixed)",
        "on-primary-fixed": "var(--md-sys-color-on-primary-fixed)",
        "primary-fixed-dim": "var(--md-sys-color-primary-fixed-dim)",
        "on-primary-fixed-variant":
          "var(--md-sys-color-on-primary-fixed-variant)",

        "secondary-fixed": "var(--md-sys-color-secondary-fixed)",
        "on-secondary-fixed": "var(--md-sys-color-on-secondary-fixed)",
        "secondary-fixed-dim": "var(--md-sys-color-secondary-fixed-dim)",
        "on-secondary-fixed-variant":
          "var(--md-sys-color-on-secondary-fixed-variant)",

        "tertiary-fixed": "var(--md-sys-color-tertiary-fixed)",
        "on-tertiary-fixed": "var(--md-sys-color-on-tertiary-fixed)",
        "tertiary-fixed-dim": "var(--md-sys-color-tertiary-fixed-dim)",
        "on-tertiary-fixed-variant":
          "var(--md-sys-color-on-tertiary-fixed-variant)",

        "surface-dim": "var(--md-sys-color-surface-dim)",
        "surface-bright": "var(--md-sys-color-surface-bright)",
        "surface-container-lowest":
          "var(--md-sys-color-surface-container-lowest)",
        "surface-container-low": "var(--md-sys-color-surface-container-low)",
        "surface-container": "var(--md-sys-color-surface-container)",
        "surface-container-high": "var(--md-sys-color-surface-container-high)",
        "surface-container-highest":
          "var(--md-sys-color-surface-container-highest)",

        "brand-purple": "var(--extended-color-brand-purple)",
        "brand-on-purple": "var(--extended-color-brand-on-purple)",
        "brand-purple-container":
          "var(--extended-color-brand-purple-container)",
        "brand-on-purple-container":
          "var(--extended-color-brand-on-purple-container)",

        "brand-orange": "var(--extended-color-brand-orange)",
        "brand-on-orange": "var(--extended-color-brand-on-orange)",
        "brand-orange-container":
          "var(--extended-color-brand-orange-container)",
        "brand-on-orange-container":
          "var(--extended-color-brand-on-orange-container)",

        "brand-blue": "var(--extended-color-brand-blue)",
        "brand-on-blue": "var(--extended-color-brand-on-blue)",
        "brand-blue-container": "var(--extended-color-brand-blue-container)",
        "brand-on-blue-container":
          "var(--extended-color-brand-on-blue-container)",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["fantasy"],
  },
  darkMode: ["class", "[data-mode=dark]"],
  safelist: [
    {
      pattern: /bg-brand-(.*)/,
    },
  ],
};
export default config;
