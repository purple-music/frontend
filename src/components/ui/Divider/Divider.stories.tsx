import type { Meta, StoryObj } from "@storybook/react";
import { FaMusic } from "react-icons/fa6";

import Divider from "./Divider";

const meta = {
  title: "atoms/Divider",
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    children: "OR",
  },
  render: (args) => (
    <div className="h-8 w-96 flex items-center justify-center">
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    children: "OR",
  },
  render: (args) => (
    <div className="h-96 w-8 flex items-center justify-center">
      <Divider {...args} />
    </div>
  ),
};
