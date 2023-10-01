import { createSlice } from '@reduxjs/toolkit';

import type { Chat } from '../models';

const initialState: Chat[] = [
  {
    id: 1,
    users: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        avatar: '',
        status: false,
      },
    ],
    messages: [
      {
        id: 1,
        userId: 1,
        message: 'Hello',
        date: '1995-12-17T03:24:00',
        status: true,
        isEdit: false,
      },
    ],
  },
  {
    id: 2,
    users: [
      {
        id: 2,
        firstName: 'Russell',
        lastName: 'Riley',
        avatar: '',
        status: false,
      },
    ],
    messages: [
      {
        id: 2,
        userId: 2,
        message: 'How a u?',
        date: '1995-12-17T03:24:00',
        status: true,
        isEdit: false,
      },
    ],
  },
];

const chatSlice = createSlice({
  name: '@@chat',
  initialState,
  reducers: {},
});

const chatReducer = chatSlice.reducer;

export default chatReducer;
