import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '@/api/httpApi';

import { User } from '@/models/data';
import getAvatar from '@/utils/getAvatar';

const getUsers = createAsyncThunk('@@users', async (username: string) => {
  const url = `/user/user/${username}`;

  const res = await $http.get(url);
  const users: User[] = await res.data.message;

  let usersWithAvatar = users;

  if (users.length > 0) {
    usersWithAvatar = await Promise.all(
      users.map(async (user) => {
        const avatarUrl = await getAvatar(user);
        if (avatarUrl) return { ...user, avatar: avatarUrl };
        return user;
      })
    );
  }

  return usersWithAvatar;
});

export { getUsers };
