import type { Meta, StoryObj } from "@storybook/react";

import DashboardPage from "./DashboardPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "organisms/DashboardPage",
  component: DashboardPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { date: new Date() },
};
