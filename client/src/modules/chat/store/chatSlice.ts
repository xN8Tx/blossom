import { createSlice } from '@reduxjs/toolkit';

import reducers from './chatReducers';
import {
  addFileToChat,
  addMessagesToChat,
  deleteChat,
  deleteMessage,
  editMessage,
  getChatMessages,
  getChats,
  readMessage,
} from './chatThunk';

import type { ChatInitialState } from '@/models/data';

const initialState: ChatInitialState = {
  loading: 'idle',
  data: null,
  isLoaded: false,
  isConnected: false,
  isReRender: false,
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
      })
      .addCase(getChatMessages.fulfilled, (state, action) => {
        const index = state.data!.findIndex(
          (chat) => `${chat.id}` === action.payload
        );
        state.data![index].isLoaded = 'loading';
      })
      .addCase(addFileToChat.fulfilled, (state, action) => {
        const { chatId, message } = action.payload!;

        console.log(message);

        const index = state.data!.findIndex((chat) => `${chat.id}` === chatId);
        state.data![index].messages.push(message);
      })
      .addCase(addMessagesToChat.fulfilled, (state, action) => {
        const index = state.data!.findIndex(
          (chat) => `${chat.id}` === action.payload.chatId
        );

        state.data![index].messages = action.payload.messages;
        state.data![index].isLoaded = 'success';
      })
      .addCase(deleteChat.pending, (state) => {
        state.isReRender = true;
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        state.data =
          state.data?.filter(
            (chat) => Number(chat.id) !== Number(action.payload)
          ) || null;

        state.isReRender = false;
      });
  },
});

const chatReducer = chatSlice.reducer;
const {
  addMessageToChat,
  addReadMessages,
  addEditMessage,
  addDeleteMessage,
  changeIsLoaded,
  addCompanionStatus,
  changeIsConnected,
  addNewChat,
  addDeleteChat,
} = chatSlice.actions;

export default chatReducer;
export {
  addMessagesToChat,
  addMessageToChat,
  addReadMessages,
  addEditMessage,
  addDeleteMessage,
  changeIsLoaded,
  addCompanionStatus,
  changeIsConnected,
  addNewChat,
  addDeleteChat,
};
