import { clsx } from "clsx";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface ButtonBaseProps
  extends Omit<ComponentPropsWithoutRef<"button">, "className"> {
  /** Content to be rendered inside the button */
  children?: ReactNode;
  /** Icon to be rendered before the children */
  startIcon?: ReactNode;
  /** Icon to be rendered after the children */
  endIcon?: ReactNode;
  /** Custom classes for styling. Should specify: bg color, text color, hover state, focus outline color */
  className?: string;
  /** Width of the button: take up the full width of the container, or a fixed width */
  width?: "full" | "squared" | "regular";
  /** Size of the button */
  size?: "sm" | "md" | "lg" | "xl";
}

const BUTTON_SIZES = {
  sm: "h-8 min-w-8",
  md: "h-10 min-w-10",
  lg: "h-12 min-w-12",
  xl: "h-14 min-w-14",
} as const;

const BUTTON_PADDINGS = {
  sm: "px-4",
  md: "px-6",
  lg: "px-8",
  xl: "px-10",
} as const;

const ButtonBase = ({
  children,
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  className,
  width = "regular",
  size = "md",
  type = "button",
  ...restProps
}: ButtonBaseProps) => {
  const baseClasses = clsx(
    // Base styles
    "flex items-center",
    "focus:outline outline-offset-2 outline-4",
    "rounded-full",
    "duration-200 ease-out",

    // Size styles
    BUTTON_SIZES[size],

    // Shape and padding styles
    {
      // Squared button styles
      "p-0": width === "squared",

      // Full width button styles
      "w-full": width === "full",
      "justify-center": width !== "full",

      // Regular button styles
      [`${BUTTON_PADDINGS[size]} gap-2`]: width === "regular",
      "pr-6 gap-3": width === "full" && !endIcon,
      "pl-6 gap-3": width === "full" && !startIcon,

      // Icon adjustments for regular buttons
      "pl-4": width !== "squared" && startIcon,
      "pr-4": width !== "squared" && endIcon,
    },

    // State styles
    disabled && "opacity-50 cursor-not-allowed",

    // Custom classes
    className,
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...restProps}
    >
      {startIcon}
      {children}
      {endIcon}
      {BUTTON_PADDINGS[size]}
    </button>
  );
};

export default ButtonBase;
