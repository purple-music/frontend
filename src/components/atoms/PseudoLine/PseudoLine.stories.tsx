import type { Meta, StoryObj } from "@storybook/react";

import Typography from "../Typography/Typography";
import PseudoLine from "./PseudoLine";

const meta = {
  title: "atoms/PseudoLine",
  component: PseudoLine,
} satisfies Meta<typeof PseudoLine>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Typography variant="label" size="large">
        Hello World!
      </Typography>
    ),
    color: "bg-blue-300",
  },
  render: (args) => (
    <div className="h-8">
      <PseudoLine {...args} />
    </div>
  ),
};
