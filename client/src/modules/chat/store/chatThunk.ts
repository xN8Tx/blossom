import { createAsyncThunk } from '@reduxjs/toolkit';

import $http from '@/api/httpApi';
import websocketAPI, { HandlerFunctionType } from '@/api/WebsocketAPI';

import {
  addCompanionStatus,
  addDeleteChat,
  addDeleteMessage,
  addEditMessage,
  addMessageToChat,
  addNewChat,
  addReadMessages,
  changeIsConnected,
} from './chatSlice';

import type { RootState } from '@/store';
import type {
  CreateChatBody,
  CreateChatBodyRes,
  DeleteChatBody,
  DeleteChatBodyRes,
  DeleteMessageBody,
  DeleteMessageBodyRes,
  EditMessageBody,
  EditMessageBodyRes,
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  Message,
  MessageBody,
  MessageBodyRes,
  ReadMessageBody,
  ReadMessageBodyRes,
  SendFileBody,
  SendFileBodyRes,
  WhoIsOnlineBody,
  WhoIsOnlineBodyRes,
} from '@/models/socket';
import { addContactStatus } from '@contact/store/contacts/contactSlice';
import { ChatWithInfo } from '@/models/data';
import getAvatar from '@/utils/getAvatar';
import getFile from '../utils/getFile';

type CreateMessageMessage = {
  chatId: string;
  message: string;
};

type CreateSendFile = {
  chatId: string;
  file: {
    file: string;
    fileType: string;
    fileName: string;
    fileExtension: string;
  };
};

type EditDeleteMessageMessage = {
  chatId: string;
  message: {
    id: string;
    message?: string;
  };
};

type setWebsocketHandlerData = {
  openCb: HandlerFunctionType;
  closeCb: HandlerFunctionType;
};

// SEND
const sendMessage = createAsyncThunk(
  '@@chats/sendMessage',
  async (data: CreateMessageMessage, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const chat = (getState() as RootState).chat.data?.find(
      (chat) => Number(chat.id) === Number(data!.chatId)
    );

    const title: Message<MessageBody> = {
      event: 'MESSAGE',
      body: {
        userId: userId!.toString(),
        companionId: chat!.user.id.toString(),
        message: {
          chatId: data.chatId.toString(),
          message: data.message,
          userId: userId!,
          date: new Date().toString(),
          status: 'loading',
          isEdit: false,
        },
      },
    };

    websocketAPI.sendMessage(title);
  }
);
const sendFile = createAsyncThunk(
  '@@chats/sendFile',
  async (data: CreateSendFile, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const chat = (getState() as RootState).chat.data?.find(
      (chat) => Number(chat.id) === Number(data!.chatId)
    );

    const title: Message<SendFileBody> = {
      event: 'SEND_FILE',
      body: {
        userId: userId!.toString(),
        companionId: chat!.user.id.toString(),
        message: {
          chatId: data.chatId.toString(),
          message: '',
          userId: userId!,
          date: new Date().toString(),
          status: 'loading',
          isEdit: false,
        },
        file: data.file,
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

// ADD
const addFileToChat = createAsyncThunk(
  '@@chat/addFileToChat',
  async (data: Message<MessageBodyRes>) => {
    const { chatId, message } = data.body;

    const [fileUrl, fileType] = await getFile(message.message);
    message.message = fileUrl;
    message.type = fileType;

    return { message, chatId };
  }
);
const addMessagesToChat = createAsyncThunk(
  '@@chat/addMessagesToChat',
  async (action: Message<GetChatMessagesBodyRes>) => {
    const modifiedMessages = await Promise.all(
      action.body.messages.map(async (mes) => {
        if (mes.type) {
          const [fileUrl, fileType] = await getFile(mes.message);
          return { ...mes, message: fileUrl, type: fileType };
        }
        return mes;
      })
    );

    return { ...action.body, messages: modifiedMessages };
  }
);

// GET
const getChats = createAsyncThunk(
  '@@chats/getChats',
  async (_, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const url = `/chats/${userId}`;

    const res = await $http.get(url);
    const chats: ChatWithInfo[] = res.data.message;

    await new Promise((resolve) => {
      const length = chats.length - 1;
      chats.forEach(async (chat, index) => {
        const avatarUrl = await getAvatar(chat.user);

        if (avatarUrl) chat.user.avatar = avatarUrl;
        if (length === index) resolve(true);
      });
    });

    return chats;
  }
);
const getOnlineContacts = createAsyncThunk(
  '@@chats/getOnlineContacts',
  async (_, { getState, dispatch }) => {
    const userId = (getState() as RootState).user.data.id;
    const chats = (getState() as RootState).chat.data;
    const contacts = (getState() as RootState).contacts.data;

    const contactsId: Set<string> = new Set();

    chats?.forEach((chat) => {
      contactsId.add(chat.user.id.toString());
    });
    contacts?.forEach((contact) => {
      contactsId.add(contact.contactId.toString());
    });

    const title: Message<WhoIsOnlineBody> = {
      event: 'WHO_IS_ONLINE',
      body: {
        userId: userId!.toString(),
        contactsId: Array.from(contactsId),
      },
    };

    websocketAPI.sendMessage(title);
    setTimeout(() => {
      dispatch(getOnlineContacts());
    }, 15000);
  }
);
const getChatMessages = createAsyncThunk(
  '@@chats/getChatMessages',
  async (chatId: string) => {
    const title: Message<GetChatMessagesBody> = {
      event: 'GET_CHAT_MESSAGE',
      body: {
        chatId: chatId,
      },
    };

    websocketAPI.sendMessage<GetChatMessagesBody>(title);
    return chatId;
  }
);
const createChat = createAsyncThunk(
  '@@chats/deleteChat',
  async (companionId: string, { getState }) => {
    const userId = (getState() as RootState).user.data.id;

    const title: Message<CreateChatBody> = {
      event: 'CREATE_CHAT',
      body: {
        userId: userId!.toString(),
        companionId: companionId,
      },
    };

    websocketAPI.sendMessage(title);
  }
);
const deleteChat = createAsyncThunk(
  '@@chats/deleteChat',
  async (chatId: string, { getState }) => {
    const userId = (getState() as RootState).user.data.id;
    const chat = (getState() as RootState).chat.data?.find(
      (chat) => Number(chat.id) === Number(chatId)
    );

    const title: Message<DeleteChatBody> = {
      event: 'DELETE_CHAT',
      body: {
        chatId: chatId,
        userId: userId!.toString(),
        companionId: chat!.user.id.toString(),
      },
    };

    websocketAPI.sendMessage(title);
    return chatId;
  }
);

// START WEBSOCKET
const startWebsocket = createAsyncThunk(
  '@@chats/startWebsocket',
  async (_, { getState }) => {
    const userId = (getState() as RootState).user.data.id;

    const url = `/ws/${userId}`;
    const res = await $http.get(url);
    const key = res.data.message;

    websocketAPI.start(key);
  }
);
const setWebsocketHandler = createAsyncThunk(
  '@@chat/setWebsocketHandler',
  ({ openCb, closeCb }: setWebsocketHandlerData, { dispatch }) => {
    websocketAPI.setHandlerFunctions(openCb, closeCb);
    websocketAPI.setConnector((data) => dispatch(websocketConnector(data)));
  }
);
const websocketConnector = createAsyncThunk(
  '@@chat/connector',
  async (data: Message<unknown>, { dispatch }) => {
    switch (data.event) {
      case 'READY':
        dispatch(changeIsConnected());
        dispatch(getOnlineContacts());
        break;
      case 'GET_CHAT_MESSAGE':
        dispatch(addMessagesToChat(data as Message<GetChatMessagesBodyRes>));
        break;
      case 'SEND_FILE': {
        dispatch(addFileToChat(data as Message<SendFileBodyRes>));
        break;
      }
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
      case 'WHO_IS_ONLINE':
        dispatch(addCompanionStatus(data as Message<WhoIsOnlineBodyRes>));
        dispatch(addContactStatus(data as Message<WhoIsOnlineBodyRes>));
        break;
      case 'CREATE_CHAT':
        dispatch(addNewChat(data as Message<CreateChatBodyRes>));
        break;
      case 'DELETE_CHAT':
        dispatch(addDeleteChat(data as Message<DeleteChatBodyRes>));
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
  getOnlineContacts,
  getChatMessages,
  createChat,
  deleteChat,
  setWebsocketHandler,
  sendFile,
  addFileToChat,
  addMessagesToChat,
};
