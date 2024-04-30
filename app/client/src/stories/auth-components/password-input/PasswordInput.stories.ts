import type { Meta, StoryObj } from '@storybook/react';

import PasswordInput from '@auth/components/password-input/PasswordInput';

const meta: Meta = {
  title: 'Auth Components/Password Input',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof PasswordInput>;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    passwordInputType: 'text',
    setPassword: () => {},
    setPasswordInputType: () => {},
    password: '',
  },
};

export const Password: Story = {
  args: {
    setPasswordInputType: () => {},
    passwordInputType: 'password',
    setPassword: () => {},
    password: '',
  },
};

export const TextValue: Story = {
  args: {
    setPasswordInputType: () => {},
    passwordInputType: 'text',
    setPassword: () => {},
    password: 'password',
  },
};

export const PasswordValue: Story = {
  args: {
    setPasswordInputType: () => {},
    passwordInputType: 'password',
    setPassword: () => {},
    password: 'password',
  },
};

export default meta;
