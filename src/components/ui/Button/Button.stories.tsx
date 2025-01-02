import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaMusic } from "react-icons/fa6";

import Button from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "atoms/Button",
  component: Button,
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    variant: "filled",
    label: "Button",
  },
};

export const Tonal: Story = {
  args: {
    variant: "tonal",
    label: "Button",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    label: "Button",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    label: "Button",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    label: "Button",
  },
};

export const StartIcon: Story = {
  args: {
    startIcon: <FaMusic />,
    variant: "filled",
    label: "Button",
  },
};

