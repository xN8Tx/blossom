import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import type { Meta, StoryObj } from '@storybook/react';

import messagesMock from '@/__test__/__mock__/message.mock';
import { chat, user } from '@/__test__/__mock__/state.mock';
import mockState from '@/__test__/__mock__/store.mock';
import imageMock from '@/__test__/__mock__/image.mock';

import ChatItem from '@chat/components/sidebar/chat-item/ChatItem';

const meta: Meta = {
  title: 'Chat Components/Sidebar Chat Item',
  component: ChatItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider store={mockState}>
        <BrowserRouter>
          <div style={{ width: '270px' }}>
            <Story />
          </div>
        </BrowserRouter>
      </Provider>
    ),
  ],
  args: {},
} satisfies Meta<typeof ChatItem>;

type Story = StoryObj<typeof meta>;

export const OnlineFromUser: Story = {
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 10,
    user: user.data,
    messages: [messagesMock.messageFromUser],
  },
};
export const OnlineFromUserRead: Story = {
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 10,
    user: user.data,
    messages: [messagesMock.readEditMessageFromUser],
  },
};
export const OnlineFromComp: Story = {
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 0,
    user: chat.data![2].user,
    messages: [messagesMock.readMessage],
  },
};
export const OnlineFromCompNotification: Story = {
  args: {
    chatId: 1,
    title: '',
    avatar: imageMock,
    notification: 10,
    user: chat.data![2].user,
    messages: [messagesMock.readMessage],
  },
};

export default meta;
