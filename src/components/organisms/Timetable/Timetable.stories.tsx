import type { Meta, StoryObj } from "@storybook/react";

import Timetable from "./Timetable";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "organisms/Timetable",
  component: Timetable,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Timetable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    startDate: "2023-01-01",
    endDate: "2023-01-08",
    timezone: "en-US",
    studios: ["blue", "orange", "purple"],
  },
};
