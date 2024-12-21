import type { Meta, StoryObj } from "@storybook/react";
import { FaClock } from "react-icons/fa6";

import IconLabel from "./IconLabel";

const meta = {
  title: "atoms/IconLabel",
  component: IconLabel,
} satisfies Meta<typeof IconLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <FaClock size={20} />, // Icon size should be 24, but Fa icons don't have 2px padding
    label: "09:00 - 10:00",
  },
};
