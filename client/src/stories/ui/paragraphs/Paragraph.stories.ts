import type { Meta, StoryObj } from '@storybook/react';

import Paragraph from '@/ui/paragraphs/Paragraph';

const meta = {
  title: 'UI/Paragraph',
  component: Paragraph,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Green: Story = {
  args: {
    children: 'Green',
    color: 'green',
  },
};

export const Message: Story = {
  args: {
    children: 'Message',
    color: 'message',
  },
};

export const User: Story = {
  args: {
    children: 'User',
    color: 'user',
  },
};

export const XS: Story = {
  args: {
    children: 'XS',
    size: 'xs',
  },
};

export const S: Story = {
  args: {
    children: 'S',
    size: 's',
  },
};

export const M: Story = {
  args: {
    children: 'M',
    size: 'm',
  },
};

export const L: Story = {
  args: {
    children: 'L',
    size: 'l',
  },
};
