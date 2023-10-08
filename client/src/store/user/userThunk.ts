import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '../../api/httpApi';

import type { EditUserTitle, GetUserTitle, User } from './index';

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
  async (title: EditUserTitle) => {
    const url = `/user/`;

    const res = await $http.put(url, title);
    const data: User = await res.data.message;

    return data;
  }
);

export { getUser, editUser };
