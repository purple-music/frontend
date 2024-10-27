import clsx from "clsx";
import { set } from "date-fns";
import { useState } from "react";

import ButtonBase from "../ButtonBase/ButtonBase";
import Typography from "../Typography/Typography";

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
