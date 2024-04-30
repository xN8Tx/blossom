import { createAsyncThunk } from '@reduxjs/toolkit';

import type {
  LoginCodeTitle,
  LoginTitle,
  RegistrationTitle,
} from './authTypes';

import $http from '../../api/httpApi';
import { resetUser } from '../user/userSlice';

const sendLoginCode = createAsyncThunk(
  '@@auth/loginCode',
  async (title: LoginCodeTitle) => {
    const { email, password } = title;
    await $http.post('auth/login-code', { email, password });
  }
);
const login = createAsyncThunk('@@auth/login', async (title: LoginTitle) => {
  const { email, password, code } = title;

  const message = await $http.post('auth/login', { email, password, code });
  const accessToken = message.data.message;

  localStorage.setItem('accessToken', accessToken);
});
const sendRegistrationCode = createAsyncThunk(
  '@@auth/registrationCode',
  async (title: RegistrationTitle) => {
    const { email } = title;

    await $http.post('auth/registration-code', { email });
  }
);
const registration = createAsyncThunk(
  '@@auth/registration',
  async (title: RegistrationTitle) => {
    const { firstName, lastName, username, email, password, code } = title;

    const message = await $http.post('auth/registration', {
      firstName,
      lastName,
      username,
      email,
      password,
      code,
    });

    const accessToken = message.data.message;

    localStorage.setItem('accessToken', accessToken);
  }
);
const logout = createAsyncThunk('@@auth/logout', async (_, { dispatch }) => {
  await $http.delete('auth/logout');
  dispatch(resetUser());

  localStorage.removeItem('accessToken');
});

export { sendLoginCode, login, sendRegistrationCode, registration, logout };
