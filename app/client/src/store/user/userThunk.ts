import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '../../api/httpApi';

import type {
  EditAvatarTitle,
  EditUserTitle,
  GetUserTitle,
  User,
} from './index';
import { RootState } from '..';
import getAvatar from '@/utils/getAvatar';

const getUser = createAsyncThunk(
  '@@user/getUser',
  async (title: GetUserTitle) => {
    const { id } = title;
    const url = `/user/all/${id}`;

    const res = await $http.get(url);
    const data: User = await res.data.message;

    const newAvatar = await getAvatar(data);
    if (newAvatar) data.avatar = newAvatar;

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

const editAvatar = createAsyncThunk(
  '@@user/editAvatar',
  async (
    { file, fileName, fileType, fileExtension }: EditAvatarTitle,
    thunkAPI
  ) => {
    const { getState } = thunkAPI;
    const userId = (getState() as RootState).user.data.id;

    const url = `/user/avatar`;
    const title = { id: userId, file, fileName, fileType, fileExtension };

    const res = await $http.post(url, title);
    const data: User = await res.data.message;

    const newAvatar = await getAvatar(data);
    if (newAvatar) data.avatar = newAvatar;

    return data;
  }
);

export { getUser, editUser, editAvatar };
