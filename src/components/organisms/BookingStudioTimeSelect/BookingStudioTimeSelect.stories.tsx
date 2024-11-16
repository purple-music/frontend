import type { Meta, StoryObj } from "@storybook/react";

import BookingStudioTimeSelect from "./BookingStudioTimeSelect";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "organisms/BookingStudioTimeSelect",
  component: BookingStudioTimeSelect,
} satisfies Meta<typeof BookingStudioTimeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    day: new Date(),
    timeSlots: new Map([
      ["orange", { slotTime: new Date(), available: true, price: 100 }],
      ["blue", { slotTime: new Date(), available: true, price: 100 }],
    ]),
    selectedTimeSlots: [],
    setSelectedTimeSlots: () => {},
  },
};
