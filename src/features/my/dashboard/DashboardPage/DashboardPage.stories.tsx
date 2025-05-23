import type { Meta, StoryObj } from "@storybook/react";

import MyTemplate from "@/features/my/layout/MyTemplate/MyTemplate";

import DashboardPage from "./DashboardPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "pages/DashboardPage",
  component: DashboardPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      id: "string",
      email: "string",
      name: "string",
      role: "string",
      image: "string",
      statusCode: 200,
    },
  },
  render: (args) => (
    <MyTemplate>
      <DashboardPage {...args} />
    </MyTemplate>
  ),
};
