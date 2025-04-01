import clsx from "clsx";
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
      {buttons.map(({ label, value }) => {
        const isSelected = value === selected;

        return (
          <ButtonBase
            key={value}
            onClick={() => handleClick(value)}
            className={clsx({
              "z-10 bg-secondary-container text-on-secondary-container focus:outline-secondary enabled:hover:brightness-90":
                isSelected,
              "bg-transparent text-on-surface focus:outline-outline enabled:hover:bg-surface-container-high":
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
