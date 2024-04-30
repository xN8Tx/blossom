import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import mockState from '@/__test__/__mock__/store.mock';

import Buttons from '@profile/components/buttons/Buttons';

const meta: Meta = {
  title: 'Profile Components/Buttons',
  component: Buttons,
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
} satisfies Meta<typeof Buttons>;

type Story = StoryObj<typeof meta>;

export const Classic: Story = {
  args: {},
};

export default meta;
