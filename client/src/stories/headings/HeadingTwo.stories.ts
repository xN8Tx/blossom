import type { Meta, StoryObj } from "@storybook/react";

import HeadingTwo from "../../ui/headings/heading-two/HeadingTwo";

const meta = {
  title: "Example/HeadingTwo",
  component: HeadingTwo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeadingTwo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Kyle",
  },
};
