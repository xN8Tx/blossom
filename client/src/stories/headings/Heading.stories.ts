import type { Meta, StoryObj } from '@storybook/react';

import Heading from '../../ui/headings/Heading';

const meta = {
  title: 'Example/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    children: 'Messages',
    size: 'l',
  },
};

export const Medium: Story = {
  args: {
    children: 'Messages',
    size: 'm',
  },
};

export const Small: Story = {
  args: {
    children: 'Messages',
    size: 's',
  },
};
