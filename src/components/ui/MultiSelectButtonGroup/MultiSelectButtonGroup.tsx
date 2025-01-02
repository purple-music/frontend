import clsx from "clsx";
import { useState } from "react";

import ButtonBase, {
  getButtonClasses,
} from "@/components/ui/ButtonBase/ButtonBase";
import Typography from "@/components/ui/Typography/Typography";

interface ButtonGroupProps {
  buttons: { label: string; value: string }[];
  defaultValues?: string[];
  onClick?: (selectedValues: string[]) => void;
}

const MultiSelectButtonGroup = ({
  buttons,
  defaultValues = [],
  onClick,
}: ButtonGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);
  const className = getButtonClasses({
    width: "regular",
    size: "md",
    disabled: false,
    startIcon: false,
  });

  const handleClick = (value: string) => {
    let updatedSelectedValues;

    if (selectedValues.includes(value)) {
      // Remove the value if already selected
      updatedSelectedValues = selectedValues.filter((v) => v !== value);
    } else {
      // Add the value if not selected
      updatedSelectedValues = [...selectedValues, value];
    }

    setSelectedValues(updatedSelectedValues);

    if (onClick) {
      onClick(updatedSelectedValues);
    }
  };

  return (
    <div className="inline-flex rounded-full bg-surface-container-low">
      {buttons.map(({ label, value }, index) => {
        const isSelected = selectedValues.includes(value);

        return (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={clsx(
              {
                "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary z-10":
                  isSelected,
                "bg-transparent text-on-surface enabled:hover:bg-surface-container-high focus:outline-outline":
                  !isSelected,
              },
              className,
              {
                "rounded-l-full": index === 0,
                "rounded-r-full": index === buttons.length - 1,
              },
            )}
          >
            <Typography variant="label" size="large" component="span">
              {label}
            </Typography>
          </button>
        );
      })}
    </div>
  );
};

export default MultiSelectButtonGroup;
