import type { Meta, StoryObj } from '@storybook/react';

import Form from '@/modules/auth/components/form/Form';
import MainInput from '@/ui/inputs/main-input/MainInput';
import PrimaryButton from '@/ui/buttons/PrimaryButton/PrimaryButton';
import PasswordInput from '@auth/components/password-input/PasswordInput';

const meta: Meta = {
  title: 'Auth Components/Form',
  component: Form,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof Form>;

type Story = StoryObj<typeof meta>;

export const Classic: Story = {
  args: {
    children: (
      <>
        <MainInput
          value=''
          onChange={() => {}}
          placeholder='Input'
          type='text'
        />
        <MainInput
          value='Some text'
          onChange={() => {}}
          placeholder='Input 2'
          type='text'
        />
        <PrimaryButton onClick={() => {}}>Button</PrimaryButton>
      </>
    ),
  },
};

export const Password: Story = {
  args: {
    inputMode: 'password',
    children: (
      <>
        <MainInput
          value=''
          onChange={() => {}}
          placeholder='Input'
          type='text'
        />
        <PasswordInput
          password=''
          setPassword={() => {}}
          setPasswordInputType={() => {}}
          passwordInputType='password'
        />
        <PrimaryButton onClick={() => {}}>Button</PrimaryButton>
      </>
    ),
  },
};

export default meta;
