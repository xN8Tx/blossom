import type { Meta, StoryObj } from "@storybook/react";

import HeadingOne from "../../ui/headings/heading-one/HeadingOne";

const meta = {
  title: "Example/HeadingOne",
  component: HeadingOne,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeadingOne>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Messages",
  },
};
