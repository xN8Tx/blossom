import type { Meta, StoryObj } from "@storybook/react";

import HeadingThree from "../../ui/headings/heading-three/HeadingThree";

const meta = {
  title: "Example/HeadingThree",
  component: HeadingThree,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeadingThree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Kyle",
  },
};
