import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { Navigate } from 'react-router-dom';

import useModal from '../../../modal/hooks/useModal';
import useCodeLoading from '../../hooks/useCodeLoading';

import { sendRegistrationCode } from '../../../../store/auth/authThunk';
import { addDataOnRegistration } from '../../../../store/auth/authSlice';

import Form from '../../components/form/Form';
import MainInput from '../../../../ui/inputs/main-input/MainInput';
import PasswordInput from '../../components/password-iput/PasswordInput';
import ButtonsForm from '../../components/buttons-form/ButtonsForm';
import PrimaryButton from '../../../../ui/buttons/PrimaryButton/PrimaryButton';
import MyLink from '../../../../ui/link/MyLink';

import type { InputEventType, PasswordInputType } from '../../models';

type TitleType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  code?: number;
  authType?: 'login' | 'registration';
};

export default function Registration() {
  const dispatch = useAppDispatch();
  const modal = useModal();

  const { t } = useTranslation();
  const { isAuth, codeLoading } = useAppSelector((state) => state.auth);

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>('password');

  const onFirstNameChange = (event: InputEventType) => {
    setFirstName(event.target.value);
  };
  const onLastNameChange = (event: InputEventType) => {
    setLastName(event.target.value);
  };
  const onUsernameChange = (event: InputEventType) => {
    setUsername(event.target.value);
  };
  const onEmailChange = (event: InputEventType) => {
    setEmail(event.target.value);
  };

  const onSendCode = () => {
    if (!email.includes('@') && !email.includes('.')) {
      return modal('error', t('auth.incorrectEmail'));
    }
    if (firstName.length < 5 && lastName.length < 5 && username.length < 5) {
      return modal('error', t('auth.allField'));
    }
    if (password.length < 3) {
      return modal('error', t('auth.shortPassword'));
    }
    const title: TitleType = {
      email,
      password,
      firstName,
      lastName,
      username,
      authType: 'registration',
    };
    dispatch(sendRegistrationCode(title));
    dispatch(addDataOnRegistration(title));
  };

  useCodeLoading('codeLoading');

  const isCodeAndLoaded = isAuth === 'code' && codeLoading === 'success';
  const isNotAuth = isAuth === 'notAuth';
  const _isAuth = isAuth === 'auth';

  return (
    <>
      {_isAuth && <Navigate to='/chat' />}
      {isCodeAndLoaded && <Navigate to='/auth/code' />}
      {isNotAuth && (
        <Form inputMode={passwordInputType}>
          <MainInput
            type='text'
            placeholder={t('auth.firstName')}
            value={firstName}
            onChange={onFirstNameChange}
          />
          <MainInput
            type='text'
            placeholder={t('auth.lastName')}
            value={lastName}
            onChange={onLastNameChange}
          />
          <MainInput
            type='text'
            placeholder={t('auth.username')}
            value={username}
            onChange={onUsernameChange}
          />
          <MainInput
            type='text'
            placeholder={t('auth.email')}
            value={email}
            onChange={onEmailChange}
          />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            passwordInputType={passwordInputType}
            setPasswordInputType={setPasswordInputType}
          />
          <ButtonsForm>
            <PrimaryButton onClick={onSendCode}>
              {t('auth.sendCode')}
            </PrimaryButton>
            <MyLink to='/auth'>{t('auth.signIn')}</MyLink>
          </ButtonsForm>
        </Form>
      )}{' '}
    </>
  );
}
