import type { EmptyObject } from '@reduxjs/toolkit';
import type { LoadingType } from '../../models';

type DataType = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
};

type InitialStateType = {
  isAuth: 'notAuth' | 'code' | 'auth';
  authType: 'login' | 'registration' | null;
  codeLoading: LoadingType;
  authLoading: LoadingType;
  logoutLoading: LoadingType;
  error: string | null;
  data: DataType | EmptyObject;
};

type LoginCodeTitle = {
  email: string;
  password: string;
};

type LoginTitle = {
  email: string;
  password: string;
  code: number;
};

type RegistrationCodeTitle = {
  email: string;
};

type RegistrationTitle = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  code?: number;
  authType?: 'login' | 'registration';
};

type ActionPayload = {
  message: string;
};

export type {
  InitialStateType,
  LoginCodeTitle,
  LoginTitle,
  RegistrationTitle,
  ActionPayload,
};
