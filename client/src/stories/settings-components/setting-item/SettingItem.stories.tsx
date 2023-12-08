import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';
import type { Meta, StoryObj } from '@storybook/react';

import SettingItem from '@settings/components/sidebar/setting-item/SettingItem';

import icon from '@/assets/svg/setting-page-icons/appearanceIcon.svg';

const meta: Meta = {
  title: 'Setting Components/Settings Item',
  component: SettingItem,
  tags: ['autodocs'],
  args: {},
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: 'user',
      },
    }),
  },
} satisfies Meta<typeof SettingItem>;

type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    image: icon,
    to: '/user',
    title: 'general',
  },
};
export const Inactive: Story = {
  args: {
    image: icon,
    to: 'user',
    title: 'general',
  },
};

export default meta;
