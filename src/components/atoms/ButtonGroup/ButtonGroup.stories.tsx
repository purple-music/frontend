import type { Meta, StoryObj } from "@storybook/react";

import ButtonGroup from "./ButtonGroup";

const meta = {
  component: ButtonGroup,
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
    ],
    defaultValue: "button-1",
  },
};

