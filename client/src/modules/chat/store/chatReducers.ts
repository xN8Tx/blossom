import audioNotification from '../utils/audioNotification';
import websocketAPI from '../../../api/WebsocketAPI';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { ChatWithInfo, InitialState } from '../../../models/data';
import type {
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  Message,
  MessageBodyRes,
  ReadMessageBodyRes,
} from '../../../models/socket';

const reducers = {
  addMessagesToChat: (
    state: InitialState<ChatWithInfo[]>,
    action: PayloadAction<Message<GetChatMessagesBodyRes>>
  ) => {
    const index = state.data!.findIndex(
      (chat) => `${chat.id}` === action.payload.body.chatId
    );

    state.data![index].messages = action.payload.body.messages;
    state.data![index].isLoaded = 'success';
  },
  addMessageToChat: (
    state: InitialState<ChatWithInfo[]>,
    action: PayloadAction<Message<MessageBodyRes>>
  ) => {
    // PREPARE
    const indexOfChat = state.data!.findIndex(
      (chat) => `${chat.id}` === action.payload.body.chatId
    );

    const chatUserId = state.data![indexOfChat].user.id;

    const messageUserId = action.payload.body.message.userId;

    if (Number(chatUserId) === Number(messageUserId)) {
      audioNotification();
    }

    // REDUCER
    if (state.data![indexOfChat].notification === null)
      state.data![indexOfChat].notification = 0;
    state.data![indexOfChat].messages.push(action.payload.body.message);
    state.data![indexOfChat].notification++;
  },
  addReadMessages: (
    state: InitialState<ChatWithInfo[]>,
    action: PayloadAction<Message<ReadMessageBodyRes>>
  ) => {
    const indexOfChat = state.data!.findIndex(
      (chat) => Number(chat.id) === Number(action.payload.body.chatId)
    );
    state.data![indexOfChat].messages = action.payload.body.messages;
  },
  getChatMessages: {
    reducer: (
      state: InitialState<ChatWithInfo[]>,
      action: PayloadAction<string>
    ) => {
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
};

export default reducers;
