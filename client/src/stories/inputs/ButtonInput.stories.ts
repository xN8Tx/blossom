/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import ButtonInput from '../../ui/inputs/button-input/ButtonInput';

const meta = {
  title: 'Example/ButtonInput',
  component: ButtonInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: 'Text',
    type: 'text',
    onClick: () => console.log('Hi'),
    position: 'left',
    children: 'Hello',
  },
};
