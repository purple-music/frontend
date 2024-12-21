import type { Meta, StoryObj } from "@storybook/react";

import Typography from "../Typography/Typography";
import PeopleInput from "./PeopleInput";

const meta = {
  title: "atoms/PeopleInput",
  component: PeopleInput,
} satisfies Meta<typeof PeopleInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
    onChange: (value: number) => console.log(value),
  },
};
