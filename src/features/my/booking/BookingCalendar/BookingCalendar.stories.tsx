import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaBook, FaHouse, FaMusic } from "react-icons/fa6";

import BookingCalendar from "./BookingCalendar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "molecules/BookingCalendar",
  component: BookingCalendar,
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof BookingCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// interface NavbarProps {
//   buttons: { label: string; value: string }[];
//   defaultValue?: string;
//   onClick?: (value: string) => void;
// }

export const Default: Story = {
  args: {},
};
