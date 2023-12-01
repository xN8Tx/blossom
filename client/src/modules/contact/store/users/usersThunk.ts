import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '@/api/httpApi';

import { User } from '@/models/data';

const getUsers = createAsyncThunk('@@users', async (username: string) => {
  const url = `/user/user/${username}`;

  const res = await $http.get(url);
  const users: User[] = res.data.message;

  return users;
});

export { getUsers };
