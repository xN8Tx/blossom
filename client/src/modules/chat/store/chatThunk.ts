import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '../../../api/httpApi';
import websocketAPI from '../../../api/WebsocketAPI';
import {
  addDeleteMessage,
  addEditMessage,
  addMessagesToChat,
  addMessageToChat,
  addReadMessages,
} from './chatSlice';

import type { RootState } from '../../../store';
import type {
  DeleteMessageBody,
  DeleteMessageBodyRes,
  EditMessageBody,
  EditMessageBodyRes,
  GetChatMessagesBodyRes,
  Message,
  MessageBody,
  MessageBodyRes,
  ReadMessageBody,
  ReadMessageBodyRes,
} from '../../../models/socket';
import type { Messages } from '../../../models/data';

type EditDeleteMessageMessage = {
  chatId: string;
  message: {
    id: string;
    message?: string;
  };
};

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
const readMessage = createAsyncThunk(
  '@@chats/readMessage',
  async (chatId: string, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const chat = (getState() as RootState).chat.data?.find(
      (chat) => Number(chat.id) === Number(chatId)
    );
    const index = (getState() as RootState).chat.data?.findIndex(
      (chat) => Number(chat.id) === Number(chatId)
    );

    const title: Message<ReadMessageBody> = {
      event: 'READ_MESSAGE',
      body: {
        userId: userId!.toString(),
        companionId: chat!.user.id.toString(),
        chatId: chatId,
      },
    };

    websocketAPI.sendMessage(title);

    return index;
  }
);
const editMessage = createAsyncThunk(
  '@@chats/editMessage',
  async (message: EditDeleteMessageMessage, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const chat = (getState() as RootState).chat.data?.find(
      (chat) => Number(chat.id) === Number(message.chatId)
    );

    const title: Message<EditMessageBody> = {
      event: 'EDIT_MESSAGE',
      body: {
        userId: userId!.toString(),
        chatId: chat!.id.toString(),
        companionId: chat!.user.id.toString(),
        messages: {
          id: message.message.id,
          message: message.message.message!,
        },
      },
    };

    websocketAPI.sendMessage(title);
    return message;
  }
);
const deleteMessage = createAsyncThunk(
  '@@chats/deleteMessage',
  async (message: EditDeleteMessageMessage, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const chat = (getState() as RootState).chat.data?.find(
      (chat) => Number(chat.id) === Number(message.chatId)
    );

    const title: Message<DeleteMessageBody> = {
      event: 'DELETE_MESSAGE',
      body: {
        userId: userId!.toString(),
        chatId: chat!.id.toString(),
        companionId: chat!.user.id.toString(),
        messages: {
          id: message.message.id,
        },
      },
    };

    const result = {
      chatId: chat!.id,
      message: {
        id: message.message.id,
      },
    };

    websocketAPI.sendMessage(title);
    return result;
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
      case 'READ_MESSAGE':
        dispatch(addReadMessages(data as Message<ReadMessageBodyRes>));
        break;
      case 'EDIT_MESSAGE':
        dispatch(addEditMessage(data as Message<EditMessageBodyRes>));
        break;
      case 'DELETE_MESSAGE':
        dispatch(addDeleteMessage(data as Message<DeleteMessageBodyRes>));
        break;
    }
  }
);

export {
  getChats,
  startWebsocket,
  sendMessage,
  readMessage,
  editMessage,
  deleteMessage,
};
