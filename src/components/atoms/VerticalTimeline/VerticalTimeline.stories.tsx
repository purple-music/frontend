import type { Meta, StoryObj } from "@storybook/react";

import VerticalTimeline from "./VerticalTimeline";

const meta = {
  title: "atoms/VerticalTimeline",
  component: VerticalTimeline,
} satisfies Meta<typeof VerticalTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { startHour: 9, endHour: 17 },
  render: (args) => <VerticalTimeline {...args}></VerticalTimeline>,
};
