import type { Meta, StoryObj } from "@storybook/react";
import { FaClock } from "react-icons/fa6";

import IconLabel from "@/components/ui/IconLabel/IconLabel";
import Typography from "@/components/ui/Typography/Typography";

import Surface from "./Surface";

const meta = {
  title: "atoms/Surface",
  component: Surface,
} satisfies Meta<typeof Surface>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Surface {...args}>
      <IconLabel icon={<FaClock size={20} />} label="09:00 - 10:00" />
      <Typography variant="body">Test</Typography>
    </Surface>
  ),
};
