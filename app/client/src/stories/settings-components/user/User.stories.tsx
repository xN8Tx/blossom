import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import mockState from '@/__test__/__mock__/store.mock';

import User from '@settings/components/sidebar/user/User';

const meta: Meta = {
  title: 'Setting Components/User',
  component: User,
  tags: ['autodocs'],
  args: {},
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Provider store={mockState}>
          <div style={{ width: '270px' }}>
            <Story />
          </div>
        </Provider>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof User>;

type Story = StoryObj<typeof meta>;

export const Classic: Story = {
  args: {},
};

export default meta;
