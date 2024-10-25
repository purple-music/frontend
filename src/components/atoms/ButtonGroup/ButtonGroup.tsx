import clsx from "clsx";
import { set } from "date-fns";
import { useState } from "react";

interface GroupItemProps {
  label: string;
  onClick: () => void;
  selected: boolean;
  position: "first" | "last" | "middle";
}

const GroupItem = ({ label, onClick, selected, position }: GroupItemProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center focus:outline focus:outline-4 focus:outline-secondary rounded-full h-10 gap-4 px-6",
        {
          "bg-secondary-container text-on-secondary-container": selected,
          "text-on-surface": !selected,
          "rounded-l-full": position === "first",
          "rounded-r-full": position === "last",
        },
      )}
    >
      {label}
    </button>
  );
};

interface ButtonGroupProps {
  buttons: { label: string; value: string }[];
  defaultValue?: string;
  onClick?: (value: string) => void;
}

const ButtonGroup = ({ buttons, defaultValue, onClick }: ButtonGroupProps) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleClick = (value: string) => {
    setSelected(value);
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <div className="inline-flex rounded-full bg-surface-container-low">
      {buttons.map(({ label, value }, index) => {
        const isSelected = value === selected;

        return (
          <GroupItem
            key={value}
            label={label}
            onClick={() => handleClick(value)}
            selected={isSelected}
            position={
              index === 0
                ? "first"
                : index === buttons.length - 1
                  ? "last"
                  : "middle"
            }
          />
        );
      })}
    </div>
  );
};

export default ButtonGroup;
