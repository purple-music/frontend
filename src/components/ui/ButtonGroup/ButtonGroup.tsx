import clsx from "clsx";
import { set } from "date-fns";
import { useState } from "react";

import ButtonBase from "@/components/ui/ButtonBase/ButtonBase";
import Typography from "@/components/ui/Typography/Typography";

type Key = string | number;

interface ButtonGroupProps<KeyT extends Key> {
  buttons: { label: string; value: KeyT }[];
  defaultValue?: KeyT;
  onClick?: (value: KeyT) => void;
}

const ButtonGroup = <KeyT extends Key>({
  buttons,
  defaultValue,
  onClick,
}: ButtonGroupProps<KeyT>) => {
  const [selected, setSelected] = useState<KeyT | undefined>(defaultValue);

  const handleClick = (value: KeyT) => {
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
          <ButtonBase
            key={value}
            onClick={() => handleClick(value)}
            className={clsx({
              "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary z-10":
                isSelected,
              "bg-transparent text-on-surface enabled:hover:bg-surface-container-high focus:outline-outline":
                !isSelected,
            })}
          >
            <Typography variant="label" size={"large"} component="span">
              {label}
            </Typography>
          </ButtonBase>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
