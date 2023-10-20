import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '../../../api/httpApi';

import type { RootState } from '../../../store';

const getProfile = createAsyncThunk(
  '@@profile/getProfile',
  async (id: number, { getState }) => {
    const userId = (getState() as RootState).user.data.id;

    const url = `/user/profile/${userId}/${id}`;
    const res = await $http.get(url);
    const user = res.data.message;

    return user;
  }
);

export { getProfile };
