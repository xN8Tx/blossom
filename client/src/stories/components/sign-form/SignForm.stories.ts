import type { Meta, StoryObj } from '@storybook/react';

import SignForm from '@/components/sign-form/SignForm';

const meta: Meta = {
  title: 'Components/Sign Form',
  component: SignForm,
  parameters: {},
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SignForm>;

type Story = StoryObj<typeof meta>;

export const Classic: Story = {
  args: {
    children: 'Hello world!',
  },
};

export default meta;
