import type { Meta, StoryObj } from '@storybook/react';

import Form from '@/modules/auth/components/form/Form';
import PasswordInput from '@auth/components/password-input/PasswordInput';
import { PrimaryButton, PrimaryInput } from 'blossom-react-ui';

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
        <PrimaryInput
          value=''
          onChange={() => {}}
          placeholder='Input'
          type='text'
        />
        <PrimaryInput
          value='Some text'
          onChange={() => {}}
          placeholder='Input 2'
          type='text'
        />
        <PrimaryButton onClick={() => {}} color='blue'>
          Button
        </PrimaryButton>
      </>
    ),
  },
};

export const Password: Story = {
  args: {
    inputMode: 'password',
    children: (
      <>
        <PrimaryInput
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
        <PrimaryButton onClick={() => {}} color='blue'>
          Button
        </PrimaryButton>
      </>
    ),
  },
};

export default meta;
