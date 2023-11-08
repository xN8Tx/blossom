import { createSlice } from '@reduxjs/toolkit';

import { getChats, readMessage } from './chatThunk';

import type { ChatWithInfo, InitialState } from '../../../models/data';
import reducers from './chatReducers';

const initialState: InitialState<ChatWithInfo[]> = {
  loading: 'idle',
  data: null,
};

const chatSlice = createSlice({
  name: '@@chat',
  initialState,
  reducers: reducers,
  extraReducers: (builder) => {
    builder
      .addCase(getChats.fulfilled, (state, action) => {
        state.loading = 'success';
        state.data = action.payload;
      })
      .addCase(getChats.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getChats.rejected, (state) => {
        state.loading = 'error';
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        state.data![action.payload!].notification = 0;
      });
  },
});

const chatReducer = chatSlice.reducer;
const {
  getChatMessages,
  addMessagesToChat,
  addMessageToChat,
  addReadMessages,
} = chatSlice.actions;

export default chatReducer;
export {
  getChatMessages,
  addMessagesToChat,
  addMessageToChat,
  addReadMessages,
};
