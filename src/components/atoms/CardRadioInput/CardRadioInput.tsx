import { Key } from "react";

type CardRadioGroupProps<T extends string | number> = {
  options: T[];
  value: T;
  name: string;
  onChange: (value: T) => void;
  children: (option: T, isChecked: boolean) => React.ReactNode;
};

const CardRadioInput = <T extends string | number>({
  options,
  value,
  name,
  onChange,
  children,
}: CardRadioGroupProps<T>) => {
  return (
    <div className="flex flex-row flex-wrap gap-4">
      {options.map((option) => (
        <label key={option} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option}
            checked={option === value}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          {children(option, option === value)}
        </label>
      ))}
    </div>
  );
};

export default CardRadioInput;
