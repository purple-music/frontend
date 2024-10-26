import clsx from "clsx";
import { set } from "date-fns";
import { useState } from "react";

import ButtonBase from "../ButtonBase/ButtonBase";
import Typography from "../Typography/Typograhy";

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
          <ButtonBase
            key={value}
            onClick={() => handleClick(value)}
            className={clsx({
              "bg-secondary-container text-on-secondary-container enabled:hover:brightness-90 focus:outline-secondary z-10":
                isSelected,
              "bg-transparent text-on-surface enabled:hover:bg-primary-container focus:outline-primary":
                !isSelected,
            })}
          >
            <Typography variant="label" size={"large"} component="span">
              {label}
            </Typography>
          </ButtonBase>
        );
        // return (
        //   <GroupItem
        //     key={value}
        //     label={label}
        //     onClick={() => handleClick(value)}
        //     selected={isSelected}
        //     position={
        //       index === 0
        //         ? "first"
        //         : index === buttons.length - 1
        //           ? "last"
        //           : "middle"
        //     }
        //   />
        // );
      })}
    </div>
  );
};

export default ButtonGroup;

