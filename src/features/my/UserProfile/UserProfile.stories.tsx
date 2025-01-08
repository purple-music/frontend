import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";

import UserProfile from "./UserProfile";

const meta = {
  title: "molecules/UserProfile",
  component: UserProfile,
} satisfies Meta<typeof UserProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    profilePicture: (
      <Image
        width={64}
        height={64}
        layout="fixed"
        src={"/logo.webp"}
        alt="Logo"
        className="h-16 w-16 rounded-full"
      />
    ),
    name: "John Doe",
    email: "jdoe@me.com",
  },
};
