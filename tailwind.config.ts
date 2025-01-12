import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--md-sys-color-primary))",
        "on-primary": "rgb(var(--md-sys-color-on-primary))",
        "primary-container": "rgb(var(--md-sys-color-primary-container))",
        "on-primary-container": "rgb(var(--md-sys-color-on-primary-container))",

        secondary: "rgb(var(--md-sys-color-secondary))",
        "on-secondary": "rgb(var(--md-sys-color-on-secondary))",
        "secondary-container": "rgb(var(--md-sys-color-secondary-container))",
        "on-secondary-container":
          "rgb(var(--md-sys-color-on-secondary-container))",

        tertiary: "rgb(var(--md-sys-color-tertiary))",
        "on-tertiary": "rgb(var(--md-sys-color-on-tertiary))",
        "tertiary-container": "rgb(var(--md-sys-color-tertiary-container))",
        "on-tertiary-container":
          "rgb(var(--md-sys-color-on-tertiary-container))",

        error: "rgb(var(--md-sys-color-error))",
        "on-error": "rgb(var(--md-sys-color-on-error))",
        "error-container": "rgb(var(--md-sys-color-error-container))",
        "on-error-container": "rgb(var(--md-sys-color-on-error-container))",

        background: "rgb(var(--md-sys-color-background))",
        "on-background": "rgb(var(--md-sys-color-on-background))",

        surface: "rgb(var(--md-sys-color-surface))",
        "on-surface": "rgb(var(--md-sys-color-on-surface))",
        "surface-variant": "rgb(var(--md-sys-color-surface-variant))",
        "on-surface-variant": "rgb(var(--md-sys-color-on-surface-variant))",
        "surface-tint": "rgb(var(--md-sys-color-surface-tint))",

        outline: "rgb(var(--md-sys-color-outline))",
        "outline-variant": "rgb(var(--md-sys-color-outline-variant))",

        shadow: "rgb(var(--md-sys-color-shadow))",
        scrim: "rgb(var(--md-sys-color-scrim))",

        "inverse-surface": "rgb(var(--md-sys-color-inverse-surface))",
        "inverse-on-surface": "rgb(var(--md-sys-color-inverse-on-surface))",
        "inverse-primary": "rgb(var(--md-sys-color-inverse-primary))",

        "primary-fixed": "rgb(var(--md-sys-color-primary-fixed))",
        "on-primary-fixed": "rgb(var(--md-sys-color-on-primary-fixed))",
        "primary-fixed-dim": "rgb(var(--md-sys-color-primary-fixed-dim))",
        "on-primary-fixed-variant":
          "rgb(var(--md-sys-color-on-primary-fixed-variant))",

        "secondary-fixed": "rgb(var(--md-sys-color-secondary-fixed))",
        "on-secondary-fixed": "rgb(var(--md-sys-color-on-secondary-fixed))",
        "secondary-fixed-dim": "rgb(var(--md-sys-color-secondary-fixed-dim))",
        "on-secondary-fixed-variant":
          "rgb(var(--md-sys-color-on-secondary-fixed-variant))",

        "tertiary-fixed": "rgb(var(--md-sys-color-tertiary-fixed))",
        "on-tertiary-fixed": "rgb(var(--md-sys-color-on-tertiary-fixed))",
        "tertiary-fixed-dim": "rgb(var(--md-sys-color-tertiary-fixed-dim))",
        "on-tertiary-fixed-variant":
          "rgb(var(--md-sys-color-on-tertiary-fixed-variant))",

        "surface-dim": "rgb(var(--md-sys-color-surface-dim))",
        "surface-bright": "rgb(var(--md-sys-color-surface-bright))",
        "surface-container-lowest":
          "rgb(var(--md-sys-color-surface-container-lowest))",
        "surface-container-low":
          "rgb(var(--md-sys-color-surface-container-low))",
        "surface-container": "rgb(var(--md-sys-color-surface-container))",
        "surface-container-high":
          "rgb(var(--md-sys-color-surface-container-high))",
        "surface-container-highest":
          "rgb(var(--md-sys-color-surface-container-highest))",

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
