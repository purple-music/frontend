import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaBook, FaHouse, FaMusic } from "react-icons/fa6";

import PersonalBookings from "./PersonalBookings";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "organisms/PersonalBookings",
  component: PersonalBookings,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PersonalBookings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { date: new Date(), bookings: [] },
};
