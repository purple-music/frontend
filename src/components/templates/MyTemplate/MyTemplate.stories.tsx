import type { Meta, StoryObj } from "@storybook/react";
import { FaBook, FaHouse, FaMusic } from "react-icons/fa6";

import ButtonGroup from "@/components/atoms/ButtonGroup/ButtonGroup";
import { Two } from "@/components/atoms/ButtonGroup/ButtonGroup.stories";

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

const buttons = [
  { label: "Home", value: "home", icon: <FaHouse size={20} /> },
  { label: "Library", value: "library", icon: <FaBook size={20} /> },
  { label: "Search", value: "search", icon: <FaMusic size={20} /> },
];

export const Default: Story = {
  args: { children: <FaHouse size={20} /> },
  render: (args) => (
    <MyTemplate {...args}>
      <ButtonGroup {...Two.args} />
    </MyTemplate>
  ),
};

