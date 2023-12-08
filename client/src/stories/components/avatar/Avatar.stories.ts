import type { Meta, StoryObj } from '@storybook/react';
import imageMock from '@/__test__/__mock__/image.mock';

import Avatar from '@/components/avatar/Avatar';

const meta: Meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    // layout: "centered",
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

export const SOfflineWithoutAvatar: Story = {
  args: {
    avatar: null,
    firstName: 'John',
    size: 's',
    isLink: false,
    status: false,
  },
};
export const MOfflineWithoutAvatar: Story = {
  args: {
    avatar: null,
    firstName: 'John',
    size: 'm',
    isLink: false,
    status: false,
  },
};
export const LOfflineWithoutAvatar: Story = {
  args: {
    avatar: null,
    firstName: 'John',
    size: 'l',
    isLink: false,
    status: false,
  },
};
export const SOnlineWithoutAvatar: Story = {
  args: {
    avatar: null,
    firstName: 'John',
    size: 's',
    isLink: false,
    status: true,
  },
};
export const SOnlineWithAvatar: Story = {
  args: {
    avatar: imageMock,
    firstName: 'John',
    size: 's',
    isLink: false,
    status: true,
  },
};
export const MOnlineWithAvatar: Story = {
  args: {
    avatar: imageMock,
    firstName: 'John',
    size: 'm',
    isLink: false,
    status: true,
  },
};
export const LOnlineWithAvatar: Story = {
  args: {
    avatar: imageMock,
    firstName: 'John',
    size: 'l',
    isLink: false,
    status: true,
  },
};

export default meta;
