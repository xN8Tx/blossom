import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import { login, registration } from '@/store/auth/authThunk';

import useCodeLoading from '@auth/hooks/useCodeLoading';

import MainInput from '@/ui/inputs/main-input/MainInput';
import PrimaryButton from '@/ui/buttons/PrimaryButton/PrimaryButton';
import ButtonsForm from '@auth/components/buttons-form/ButtonsForm';
import Form from '@auth/components/form/Form';

import type { InputEventType } from '@auth/models';

export default function Code() {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();
  const { authType, data, isAuth, authLoading } = useAppSelector(
    (state) => state.auth
  );

  const [code, setCode] = useState<string>('');

  const onCodeChange = (event: InputEventType) => {
    const code = [...event.target.value];
    const codeLastLetter = code[code.length - 1];

    if (/[0-9]/.test(codeLastLetter) && code.length !== 5) {
      setCode(event.target.value);
    }
    if (code.length === 0 && event.target.value === '') {
      setCode(event.target.value);
    }
  };

  const checkCode = () => {
    const title = JSON.parse(JSON.stringify(data));
    title.code = code;

    if (authType === 'login') {
      dispatch(login(title));
    } else if (authType === 'registration') {
      dispatch(registration(title));
    }
  };

  useCodeLoading('authLoading');

  const isAuthAndLoaded = isAuth === 'auth' && authLoading === 'success';
  const isNotAuth = isAuth === 'notAuth';
  const isCode = isAuth === 'code';

  return (
    <>
      {isAuthAndLoaded && <Navigate to='/' />}
      {isNotAuth && <Navigate to='/' />}
      {isCode && (
        <Form>
          <MainInput
            placeholder={t('auth.code')}
            type='text'
            value={code}
            onChange={onCodeChange}
          />
          <ButtonsForm>
            <PrimaryButton onClick={checkCode}>
              {t('auth.confirmCode')}
            </PrimaryButton>
          </ButtonsForm>
        </Form>
      )}
    </>
  );
}
