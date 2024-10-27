import type { Meta, StoryObj } from "@storybook/react";
import { FaBook, FaHouse, FaMusic } from "react-icons/fa6";

import MyTemplate from "./MyTemplate";

const meta = {
  title: "templates/MyTemplate",
  component: MyTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MyTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

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
