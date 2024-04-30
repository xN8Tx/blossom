import type { Meta, StoryObj } from '@storybook/react';

import BackButton from '@/components/back-button/BackButton';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta = {
  title: 'Components/Back Button',
  component: BackButton,
  parameters: {
    // layout: "centered",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof BackButton>;

type Story = StoryObj<typeof meta>;

export const Classic: Story = {
  args: {},
};

export default meta;
