/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import MainInput from '../../ui/inputs/main-input/MainInput';

const meta = {
  title: 'Example/MainInput',
  component: MainInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MainInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'Text',
    type: 'text',
  },
};
