import type { Meta, StoryObj } from "@storybook/react";

import ButtonGroup from "./ButtonGroup";

const meta = {
  title: "atoms/ButtonGroup",
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Two: Story = {
  args: {
    buttons: [
      {
        label: "Button 1",
        value: "button-1",
      },
      {
        label: "Button 2",
        value: "button-2",
      },
    ],
    defaultValue: "button-1",
  },
};

export const Five: Story = {
  args: {
    buttons: [
      {
        label: "Button 1",
        value: "button-1",
      },
      {
        label: "Button 2",
        value: "button-2",
      },
      {
        label: "Button 3",
        value: "button-3",
      },
      {
        label: "Button 4",
        value: "button-4",
      },
      {
        label: "Button 5",
        value: "button-5",
      },
    ],
    defaultValue: "button-1",
  },
};
