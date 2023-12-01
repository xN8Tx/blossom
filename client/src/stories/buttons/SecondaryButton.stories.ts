import type { Meta, StoryObj } from '@storybook/react';

import SecondaryButton from '../../ui/buttons/SecondaryButton/SecondaryButton';

const meta = {
  title: 'Example/SecondaryButton',
  component: SecondaryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: () => {},
  },
} satisfies Meta<typeof SecondaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutIcon: Story = {
  args: {
    children: 'Text',
  },
};
