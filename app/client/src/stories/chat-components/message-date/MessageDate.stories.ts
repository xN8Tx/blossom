import type { Meta, StoryObj } from '@storybook/react';

import MessageDate from '@chat/pages/chat/components/wrapper/message-date/MessageDate';

const meta: Meta = {
  title: 'Chat Components/Message Date',
  component: MessageDate,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof MessageDate>;

type Story = StoryObj<typeof meta>;

export const Today: Story = {
  args: {
    date: new Date().toString(),
  },
};

export const WedSixDec: Story = {
  args: {
    date: 'Wed Dec 06 2023 16:44:00 GMT+0700 (Новосибирск, стандартное время)',
  },
};

export default meta;
