import React, { ReactNode } from "react";

import { balsamiqSans, inter } from "@/lib/fonts";

// Define styles for each variant and size
const styles = {
  display: {
    large: {
      lineHeight: "4rem",
      fontSize: "57px",
      letterSpacing: "-0.25px",
    },
    medium: {
      lineHeight: "3.25rem",
      fontSize: "45px",
    },
    small: {
      lineHeight: "2.75rem",
      fontSize: "36px",
    },
  },
  headline: {
    large: {
      lineHeight: "2.5rem",
      fontSize: "32px",
    },
    medium: {
      lineHeight: "2.25rem",
      fontSize: "28px",
    },
    small: {
      lineHeight: "2rem",
      fontSize: "24px",
    },
  },
  title: {
    large: {
      lineHeight: "1.75rem",
      fontSize: "22px",
    },
    medium: {
      lineHeight: "1.5rem",
      fontSize: "16px",
      letterSpacing: "0.15px",
    },
    small: {
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.1px",
    },
  },
  body: {
    large: {
      lineHeight: "1.5rem",
      fontSize: "16px",
      letterSpacing: "0.1px",
    },
    medium: {
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.25px",
    },
    small: {
      lineHeight: "1rem",
      fontSize: "12px",
      letterSpacing: "0.4px",
    },
  },
  label: {
    large: {
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.1px",
      fontWeight: "500",
    },
    medium: {
      lineHeight: "1rem",
      fontSize: "12px",
      letterSpacing: "0.5px",
      fontWeight: "500",
    },
    small: {
      lineHeight: "1rem",
      fontSize: "11px",
      letterSpacing: "0.5px",
      fontWeight: "500",
    },
  },
  labelBold: {
    large: {
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.1px",
      fontWeight: "bold",
    },
    medium: {
      lineHeight: "1rem",
      fontSize: "12px",
      letterSpacing: "0.5px",
      fontWeight: "bold",
    },
    small: {
      lineHeight: "1rem",
      fontSize: "11px",
      letterSpacing: "0.5px",
      fontWeight: "bold",
    },
  },
};

type Variant =
  | "display"
  | "headline"
  | "title"
  | "body"
  | "label"
  | "labelBold";
type Size = "small" | "medium" | "large";

export function getTypographyStyles(variant: Variant, size: Size = "medium") {
  // Determine the font to use based on the variant
  const fontFamily = ["display", "headline", "title"].includes(variant)
    ? balsamiqSans
    : inter;

  // Retrieve the style for the specified variant and size
  const textStyle = styles[variant]?.[size] || {};

  return {
    className: fontFamily.className,
    style: { ...fontFamily.style, ...textStyle },
  };
}

interface TypographyProps {
  variant: Variant;
  children: ReactNode;
  size?: Size;
  className?: string;
  component?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "label";
}

const Typography = ({
  variant,
  children,
  size = "medium",
  className,
  component: Component = "span",
}: TypographyProps) => {
  // Determine the font to use based on the variant
  const fontFamily = ["display", "headline", "title"].includes(variant)
    ? balsamiqSans
    : inter;

  // Retrieve the style for the specified variant and size
  const textStyle = styles[variant]?.[size] || {};

  return React.createElement(
    Component,
    {
      style: {
        ...fontFamily.style,
        ...textStyle,
      },
      className: `${fontFamily.className} ${className}`,
    },
    children,
  );
};

export default Typography;
