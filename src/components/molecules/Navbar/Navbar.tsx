import clsx from "clsx";
import { ReactNode, useState } from "react";

import Typography from "@/components/atoms/Typography/Typography";
import NavbarItem from "@/components/molecules/Navbar/NavbarItem";

interface NavbarProps {
  buttons: { label: string; value: string; icon?: ReactNode }[];
  defaultValue?: string;
  onClick?: (value: string) => void;
}

const Navbar = ({ buttons, defaultValue, onClick }: NavbarProps) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleClick = (value: string) => {
    setSelected(value);
    if (onClick) {
      onClick(value);
    }
  };

  return (
    <nav className="inline-flex items-center justify-center flex-col rounded-[28px] bg-surface-container-low w-96">
      {buttons.map(({ label, value }, index) => (
        <NavbarItem
          icon={buttons[index].icon}
          key={value}
          onClick={() => handleClick(value)}
          isSelected={value === selected}
        >
          <Typography variant="label" size={"large"} component="span">
            {label}
          </Typography>
        </NavbarItem>
      ))}
    </nav>
  );
};

export default Navbar;
