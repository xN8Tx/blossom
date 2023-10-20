import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '../../api/httpApi';

import type { EditUserTitle, GetUserTitle, User } from './index';
import { RootState } from '..';

const getUser = createAsyncThunk(
  '@@user/getUser',
  async (title: GetUserTitle) => {
    const { id } = title;
    const url = `/user/all/${id}`;

    const res = await $http.get(url);
    const data: User = await res.data.message;

    return data;
  }
);

const editUser = createAsyncThunk(
  '@@user/editUser',
  async (title: EditUserTitle, thunkAPI) => {
    const { getState } = thunkAPI;
    const state = getState();
    const id = (state as RootState).user.data.id;

    const url = `/user/${id}`;

    const res = await $http.put(url, title);
    const data: User = await res.data.message;

    return data;
  }
);

export { getUser, editUser };
