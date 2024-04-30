import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import type {
  ActionPayload,
  InitialStateType,
  RegistrationTitle,
} from './authTypes';

import {
  login,
  logout,
  registration,
  sendLoginCode,
  sendRegistrationCode,
} from './authThunk';

const isAuth =
  localStorage.getItem('accessToken') !== null ? 'auth' : 'notAuth';

const initialState: InitialStateType = {
  isAuth: isAuth,
  authType: null,
  codeLoading: 'idle',
  authLoading: 'idle',
  logoutLoading: 'idle',
  error: null,
  data: {},
};

const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    addDataOnRegistration: (state, action) => {
      const { firstName, lastName, username, email, password, authType } =
        action.payload as RegistrationTitle;

      state.data = {
        firstName,
        lastName,
        username,
        email,
        password,
      };
      state.authType = authType!;
    },
    addDataOnLogin: (state, action) => {
      const { email, password, authType } = action.payload as RegistrationTitle;

      state.data = {
        email,
        password,
      };
      state.authType = authType!;
    },
    resetAuth: (state) => {
      state.isAuth = 'notAuth';
      state.authType = null;
      state.codeLoading = 'idle';
      state.authLoading = 'idle';
      state.logoutLoading = 'idle';
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout.rejected, (state) => {
        state.logoutLoading = 'error';
      })
      .addCase(logout.pending, (state) => {
        state.logoutLoading = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = 'notAuth';
        state.authType = null;
        state.codeLoading = 'idle';
        state.authLoading = 'idle';
        state.logoutLoading = 'success';
        state.error = null;
        state.data = {};
      })
      .addMatcher(
        isAnyOf(sendLoginCode.rejected, sendRegistrationCode.rejected),
        (state, action) => {
          state.codeLoading = 'error';
          state.error = (action.payload as ActionPayload)?.message;
        }
      )
      .addMatcher(
        isAnyOf(sendLoginCode.pending, sendRegistrationCode.pending),
        (state) => {
          state.codeLoading = 'loading';
        }
      )
      .addMatcher(
        isAnyOf(sendLoginCode.fulfilled, sendRegistrationCode.fulfilled),
        (state) => {
          state.codeLoading = 'success';
          state.isAuth = 'code';
        }
      )
      .addMatcher(
        isAnyOf(login.rejected, registration.rejected),
        (state, action) => {
          state.authLoading = 'error';
          state.error = (action.payload as ActionPayload)?.message;
        }
      )
      .addMatcher(isAnyOf(login.pending, registration.pending), (state) => {
        state.authLoading = 'loading';
      })
      .addMatcher(isAnyOf(login.fulfilled, registration.fulfilled), (state) => {
        state.authLoading = 'success';
        state.isAuth = 'auth';
      });
  },
});

const authReducer = authSlice.reducer;
const { addDataOnLogin, addDataOnRegistration, resetAuth } = authSlice.actions;

export default authReducer;
export { addDataOnLogin, addDataOnRegistration, resetAuth };
