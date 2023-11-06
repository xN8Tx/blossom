import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { getChats } from './chatThunk';
import websocketAPI from '../../../api/WebsocketAPI';

import type { ChatWithInfo, InitialState } from '../../../models/data';
import type {
  GetChatMessagesBody,
  MessageBodyRes,
  Message,
  GetChatMessagesBodyRes,
} from '../../../models/socket';

const initialState: InitialState<ChatWithInfo[]> = {
  loading: 'idle',
  data: null,
};

const chatSlice = createSlice({
  name: '@@chat',
  initialState,
  reducers: {
    addMessagesToChat: (
      state,
      action: PayloadAction<Message<GetChatMessagesBodyRes>>
    ) => {
      const index = state.data!.findIndex(
        (chat) => `${chat.id}` === action.payload.body.chatId
      );

      state.data![index].messages = action.payload.body.messages;
      state.data![index].isLoaded = 'success';
    },
    addMessageToChat: (
      state,
      action: PayloadAction<Message<MessageBodyRes>>
    ) => {
      const index = state.data!.findIndex(
        (chat) => `${chat.id}` === action.payload.body.chatId
      );

      state.data![index].messages.push(action.payload.body.message);
    },
    getChatMessages: {
      reducer: (state, action: PayloadAction<string>) => {
        const index = state.data!.findIndex(
          (chat) => `${chat.id}` === action.payload
        );
        state.data![index].isLoaded = 'loading';
      },
      prepare: (chatId: string) => {
        const title: Message<GetChatMessagesBody> = {
          event: 'GET_CHAT_MESSAGE',
          body: {
            chatId: chatId,
          },
        };
        websocketAPI.sendMessage<GetChatMessagesBody>(title);
        return { payload: chatId };
      },
    },
  },
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
      });
  },
});

const chatReducer = chatSlice.reducer;
const { getChatMessages, addMessagesToChat, addMessageToChat } =
  chatSlice.actions;

export default chatReducer;
export { getChatMessages, addMessagesToChat, addMessageToChat };
