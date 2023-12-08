import type { Meta, StoryObj } from '@storybook/react';

import UserItem from '@contact/components/sidebar/user-item/UserItem';
import imageMock from '@/__test__/__mock__/image.mock';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta = {
  title: 'Contact Components/User Item',
  component: UserItem,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof UserItem>;

type Story = StoryObj<typeof meta>;

export const Online: Story = {
  args: {
    avatar: imageMock,
    firstName: 'Hello',
    lastName: 'World',
    username: 'helloWorld',
    status: true,
    id: 1,
  },
};

export const Offline: Story = {
  args: {
    avatar: imageMock,
    firstName: 'Hello',
    lastName: 'World',
    username: 'helloWorld',
    status: false,
    id: 1,
  },
};

export default meta;
