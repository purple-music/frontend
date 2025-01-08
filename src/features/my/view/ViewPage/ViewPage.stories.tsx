import type { Meta, StoryObj } from "@storybook/react";

import MyTemplate from "@/features/my/MyTemplate/MyTemplate";

import ViewPage from "./ViewPage";

const meta = {
  title: "pages/ViewPage",
  component: ViewPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ViewPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { date: new Date() },
  render: (args) => (
    <MyTemplate page={"view"}>
      <ViewPage {...args} />
    </MyTemplate>
  ),
};
