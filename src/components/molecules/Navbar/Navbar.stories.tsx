import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { FaBook, FaHouse, FaMusic } from "react-icons/fa6";

import Navbar from "./Navbar";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "molecules/Navbar",
  component: Navbar,
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// interface NavbarProps {
//   buttons: { label: string; value: string }[];
//   defaultValue?: string;
//   onClick?: (value: string) => void;
// }

export const Default: Story = {
  args: {
    buttons: [
      // Icon size should be 24, but Fa icons don't have 2px padding
      { label: "Home", value: "home", icon: <FaHouse size={20} /> },
      { label: "Library", value: "library", icon: <FaBook size={20} /> },
      { label: "Search", value: "search", icon: <FaMusic size={20} /> },
    ],
  },
};
