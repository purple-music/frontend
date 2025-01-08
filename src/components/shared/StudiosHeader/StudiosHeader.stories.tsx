import type { Meta, StoryObj } from "@storybook/react";

import { getAllStudios } from "@/lib/utils/studios";

import StudiosHeader from "./StudiosHeader";

const meta = {
  title: "atoms/StudiosHeader",
  component: StudiosHeader,
} satisfies Meta<typeof StudiosHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    studios: getAllStudios(),
  },
  render: (args) => <StudiosHeader {...args}></StudiosHeader>,
};
