import messagesMock from '@/__test__/__mock__/message.mock';
import type { Meta, StoryObj } from '@storybook/react';

import Message from '@chat/pages/chat/components/wrapper/message/Message';

const meta: Meta = {
  title: 'Chat Components/Message',
  component: Message,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Message>;

type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    isDate: false,
    isUser: true,
    messageObj: messagesMock.message,
  },
};

export const UserRead: Story = {
  args: {
    isDate: false,
    isUser: true,
    messageObj: messagesMock.readMessage,
  },
};

export const UserEdit: Story = {
  args: {
    isDate: false,
    isUser: true,
    messageObj: messagesMock.editMessage,
  },
};

export const UserFull: Story = {
  args: {
    isDate: true,
    isUser: true,
    messageObj: messagesMock.readEditMessage,
  },
};

export const DateUserFull: Story = {
  args: {
    isDate: true,
    isUser: true,
    messageObj: messagesMock.readEditMessage,
  },
};

export const CompMessage: Story = {
  args: {
    isDate: false,
    isUser: false,
    messageObj: messagesMock.message,
  },
};

export const CompRead: Story = {
  args: {
    isDate: false,
    isUser: false,
    messageObj: messagesMock.readMessage,
  },
};

export const CompEdit: Story = {
  args: {
    isDate: false,
    isUser: false,
    messageObj: messagesMock.editMessage,
  },
};

export const CompFull: Story = {
  args: {
    isDate: true,
    isUser: false,
    messageObj: messagesMock.readEditMessage,
  },
};

export const DateCompFull: Story = {
  args: {
    isDate: true,
    isUser: false,
    messageObj: messagesMock.readEditMessage,
  },
};

export default meta;
