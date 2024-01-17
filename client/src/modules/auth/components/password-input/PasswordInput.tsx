import { useTranslation } from 'react-i18next';
import { ButtonInput } from 'blossom-react-ui';

import PasswordEyeIcon from '@/assets/svg/PasswordEyeIcon';

import type { InputEventType, PasswordInputType } from '../../models';

type PasswordInputProps = {
  passwordInputType: PasswordInputType;
  password: string;
  setPassword: (event: string) => void;
  setPasswordInputType: (type: PasswordInputType) => void;
};

export default function PasswordInput({
  passwordInputType,
  password,
  setPassword,
  setPasswordInputType,
}: PasswordInputProps) {
  const { t } = useTranslation();

  const onPasswordChange = (event: InputEventType) => {
    setPassword(event.target.value);
  };

  const onPasswordClick = () => {
    if (passwordInputType === 'text') {
      setPasswordInputType('password');
    } else {
      setPasswordInputType('text');
    }
  };

  return (
    <ButtonInput
      placeholder={t('auth.password')}
      type={passwordInputType}
      value={password}
      onChange={onPasswordChange}
      position='right'
      onClick={onPasswordClick}
    >
      <PasswordEyeIcon />
    </ButtonInput>
  );
}
