import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import mockState from '@/__test__/__mock__/store.mock';
import imageMock from '@/__test__/__mock__/image.mock';

import ProfileInfo from '@profile/components/profile-info/ProfileInfo';

const meta: Meta = {
  title: 'Profile Components/Profile Info',
  component: ProfileInfo,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Provider store={mockState}>
          <Story />
        </Provider>
      </BrowserRouter>
    ),
  ],
  args: {},
} satisfies Meta<typeof ProfileInfo>;

type Story = StoryObj<typeof meta>;

export const Classic: Story = {
  args: {
    firstName: 'John',
    lastName: 'Smith',
    avatar: imageMock,
    username: 'john-smith',
  },
};

export default meta;
