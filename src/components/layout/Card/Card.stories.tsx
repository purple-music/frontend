import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import React from "react";
import { Radio } from "react-aria-components";

import Card, { CardBody, CardTitle } from "./Card";

const meta = {
  title: "atoms/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Image
          src={"/studios/purple.png"}
          alt={"Purple"}
          width={256}
          height={256}
        />
        <CardBody>
          <CardTitle>Purple</CardTitle>
          <ul>
            <li>- Звукозапись</li>
            <li>- Микрофон</li>
            <li>- Квадратура: 300 м2</li>
          </ul>
        </CardBody>
      </>
    ),
  },
};

export const RadioCard: Story = {
  args: {
    children: (
      <>
        <Image
          src={"/studios/purple.png"}
          alt={"Purple"}
          width={256}
          height={256}
        />
        <div>
          <Radio value={"purple"}>Purple</Radio>
          <CardBody>
            <CardTitle>Purple</CardTitle>
            <ul>
              <li>- Звукозапись</li>
              <li>- Микрофон</li>
              <li>- Квадратура: 300 м2</li>
            </ul>
          </CardBody>
        </div>
      </>
    ),
  },
};
