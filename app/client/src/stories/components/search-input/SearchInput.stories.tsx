import type { Meta, StoryObj } from '@storybook/react';

import SearchInput from '@/components/search-input/SearchInput';

const meta: Meta = {
  title: 'Components/Search Input',
  component: SearchInput,
  parameters: {
    // layout: "centered",
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SearchInput>;

type Story = StoryObj<typeof meta>;

export const WithoutValue: Story = {
  args: {
    value: '',
    onClick: () => {},
    setValue: () => {},
  },
};
export const WithValue: Story = {
  args: {
    value: 'Some text',
    onClick: () => {},
    setValue: () => {},
  },
};

export default meta;
