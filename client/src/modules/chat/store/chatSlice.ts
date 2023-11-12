import { createSlice } from '@reduxjs/toolkit';

import { deleteMessage, editMessage, getChats, readMessage } from './chatThunk';

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
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        const indexOfChat = state.data!.findIndex(
          (chat) => Number(chat.id) === Number(action.payload!.chatId)
        );
        const indexOfMessage = state.data![indexOfChat].messages.findIndex(
          (mes) => Number(mes.id) === Number(action.payload!.message.id)
        );

        state.data![indexOfChat].messages[indexOfMessage].message =
          action.payload!.message.message!;

        state.data![indexOfChat].messages[indexOfMessage].isEdit = true;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const indexOfChat = state.data!.findIndex(
          (chat) => Number(chat.id) === Number(action.payload!.chatId)
        );

        const indexOfMessage = state.data![indexOfChat].messages.findIndex(
          (message) => Number(message.id) === Number(action.payload!.message.id)
        );

        state.data![indexOfChat].messages.splice(indexOfMessage, 1);
      });
  },
});

const chatReducer = chatSlice.reducer;
const {
  getChatMessages,
  addMessagesToChat,
  addMessageToChat,
  addReadMessages,
  addEditMessage,
  addDeleteMessage,
} = chatSlice.actions;

export default chatReducer;
export {
  getChatMessages,
  addMessagesToChat,
  addMessageToChat,
  addReadMessages,
  addEditMessage,
  addDeleteMessage,
};
