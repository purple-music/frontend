import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaMusic } from "react-icons/fa6";

import IconButton from "./IconButton";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "atoms/IconButton",
  component: IconButton,
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    variant: "filled",
    icon: <FaMusic />,
  },
};

export const Tonal: Story = {
  args: {
    variant: "tonal",
    icon: <FaMusic />,
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    icon: <FaMusic />,
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    icon: <FaMusic />,
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    icon: <FaMusic />,
  },
};

