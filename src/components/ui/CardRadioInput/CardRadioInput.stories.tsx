import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaMusic } from "react-icons/fa6";

import CardRadioInput from "./CardRadioInput";

const meta = {
  title: "atoms/CardRadioInput",
  component: CardRadioInput,
} satisfies Meta<typeof CardRadioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const peopleOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Filled: Story = {
  args: {
    options: peopleOptions,
    name: "people",
    value: 4,
    onChange: fn(),
    children: (option, isSelected) => {
      return (
        <div
          className={`flex cursor-pointer flex-col items-center justify-center gap-2 ${
            isSelected ? "bg-primary text-primary-content" : ""
          }`}
        >
          <FaMusic />
          {option}
        </div>
      );
    },
  },
};
