import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '../../../api/httpApi';
import websocketAPI from '../../../api/WebsocketAPI';
import { addMessagesToChat, addMessageToChat } from './chatSlice';

import type { RootState } from '../../../store';
import type {
  GetChatMessagesBodyRes,
  Message,
  MessageBody,
  MessageBodyRes,
} from '../../../models/socket';
import type { Messages } from '../../../models/data';

const getChats = createAsyncThunk(
  '@@chats/getChats',
  async (_, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const url = `/chats/${userId}`;

    const chats = await $http.get(url);

    return chats.data.message;
  }
);
const startWebsocket = createAsyncThunk(
  '@@chats/startWebsocket',
  async (_, { getState, dispatch }) => {
    const userId = (getState() as RootState).user.data.id;

    const url = `/ws/${userId}`;
    const res = await $http.get(url);
    const key = res.data.message;

    websocketAPI.setConnector((data) => dispatch(websocketConnector(data)));
    websocketAPI.start(key);
  }
);
const websocketConnector = createAsyncThunk(
  '@@chat/connector',
  async (data: Message<unknown>, { dispatch }) => {
    switch (data.event) {
      case 'GET_CHAT_MESSAGE':
        dispatch(addMessagesToChat(data as Message<GetChatMessagesBodyRes>));
        break;
      case 'MESSAGE':
        dispatch(addMessageToChat(data as Message<MessageBodyRes>));
        break;
    }
  }
);
const sendMessage = createAsyncThunk(
  '@@chats/sendMessage',
  async (message: Omit<Messages, 'id'>, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const chat = (getState() as RootState).chat.data?.find(
      (chat) => Number(chat.id) === Number(message.chatId)
    );

    const title: Message<MessageBody> = {
      event: 'MESSAGE',
      body: {
        userId: userId!.toString(),
        companionId: chat!.user.id.toString(),
        message: message,
      },
    };

    websocketAPI.sendMessage(title);
  }
);
export { getChats, startWebsocket, sendMessage };
