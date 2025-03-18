import type { Meta, StoryObj } from "@storybook/react";

import TimeSlotCardsGroupedByDay from "./TimeSlotCardsGroupedByDay";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "organisms/TimeSlotCardsGroupedByDay",
  component: TimeSlotCardsGroupedByDay,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TimeSlotCardsGroupedByDay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { date: new Date(), timeSlots: [] },
};
