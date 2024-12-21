import type { Meta, StoryObj } from "@storybook/react";

import Typography from "../Typography/Typography";
import StudioInput from "./StudioInput";

const meta = {
  title: "atoms/StudioInput",
  component: StudioInput,
} satisfies Meta<typeof StudioInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "purple",
    onChange: (value: string) => console.log(value),
  },
};
