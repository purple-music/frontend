import { he } from "date-fns/locale";
import React, { ElementType, HTMLAttributes, ReactNode } from "react";

import { balsamiqSans, inter } from "@/app/[lng]/fonts";

// Define styles for each variant and size
const styles = {
  display: {
    large: {
      height: "4rem",
      lineHeight: "4rem",
      fontSize: "57px",
      letterSpacing: "-0.25px",
    },
    medium: {
      height: "3.25rem",
      lineHeight: "3.25rem",
      fontSize: "45px",
    },
    small: {
      height: "2.75rem",
      lineHeight: "2.75rem",
      fontSize: "36px",
    },
  },
  headline: {
    large: {
      height: "2.5rem",
      lineHeight: "2.5rem",
      fontSize: "32px",
    },
    medium: {
      height: "2.25rem",
      lineHeight: "2.25rem",
      fontSize: "28px",
    },
    small: {
      height: "2rem",
      lineHeight: "2rem",
      fontSize: "24px",
    },
  },
  title: {
    large: {
      height: "1.75rem",
      lineHeight: "1.75rem",
      fontSize: "22px",
    },
    medium: {
      height: "1.5rem",
      lineHeight: "1.5rem",
      fontSize: "16px",
      letterSpacing: "0.15px",
    },
    small: {
      height: "1.25rem",
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.1px",
    },
  },
  body: {
    large: {
      height: "1.5rem",
      lineHeight: "1.5rem",
      fontSize: "16px",
      letterSpacing: "0.1px",
    },
    medium: {
      height: "1.25rem",
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.25px",
    },
    small: {
      height: "1rem",
      lineHeight: "1rem",
      fontSize: "12px",
      letterSpacing: "0.4px",
    },
  },
  label: {
    large: {
      height: "1.25rem",
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.1px",
      fontWeight: "500",
    },
    medium: {
      height: "1rem",
      lineHeight: "1rem",
      fontSize: "12px",
      letterSpacing: "0.5px",
      fontWeight: "500",
    },
    small: {
      height: "1rem",
      lineHeight: "1rem",
      fontSize: "11px",
      letterSpacing: "0.5px",
      fontWeight: "500",
    },
  },
  labelBold: {
    large: {
      height: "1.25rem",
      lineHeight: "1.25rem",
      fontSize: "14px",
      letterSpacing: "0.1px",
      fontWeight: "bold",
    },
    medium: {
      height: "1rem",
      lineHeight: "1rem",
      fontSize: "12px",
      letterSpacing: "0.5px",
      fontWeight: "bold",
    },
    small: {
      height: "1rem",
      lineHeight: "1rem",
      fontSize: "11px",
      letterSpacing: "0.5px",
      fontWeight: "bold",
    },
  },
};

interface TypographyProps {
  variant: "display" | "headline" | "title" | "body" | "label" | "labelBold";
  children: ReactNode;
  size?: "small" | "medium" | "large";
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

