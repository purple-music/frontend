import type { Meta, StoryObj } from "@storybook/react";

import MyTemplate from "@/features/my/layout/MyTemplate/MyTemplate";

import BookingPage from "./BookingPage";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "pages/BookingPage",
  component: BookingPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BookingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { date: new Date() },
  render: (args) => (
    <MyTemplate page={""}>
      <BookingPage {...args} />
    </MyTemplate>
  ),
};
