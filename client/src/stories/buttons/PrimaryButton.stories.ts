import type { Meta, StoryObj } from "@storybook/react";

import PrimaryButton from "../../ui/buttons/PrimaryButton/PrimaryButton";

const meta = {
  title: "Example/PrimaryButton",
  component: PrimaryButton,
  parameters: {
    // layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    children: "Log in",
    color: "blue",
  },
};

export const Red: Story = {
  args: {
    children: "Log out",
    color: "red",
  },
};
