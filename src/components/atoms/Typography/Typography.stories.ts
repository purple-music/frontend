import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Typograhy from "./Typography";

const meta = {
  title: "atoms/Typograhy",
  component: Typograhy,
  argTypes: {
    variant: {
      options: ["display", "headline", "title", "body", "label", "labelBold"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    component: {
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "label",
      ],
      control: { type: "radio" },
    },
    children: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Typograhy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: {
    variant: "display",
    children: "Display",
  },
};

export const Headline: Story = {
  args: {
    variant: "headline",
    children: "Headline",
  },
};

export const Title: Story = {
  args: {
    variant: "title",
    children: "Title",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children: "Body",
  },
};

export const Label: Story = {
  args: {
    variant: "label",
    children: "Label",
  },
};

export const LabelBold: Story = {
  args: {
    variant: "labelBold",
    children: "LabelBold",
  },
};
