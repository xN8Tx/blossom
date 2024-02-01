import { createAsyncThunk } from '@reduxjs/toolkit';

import websocketAPI from '@/api/WebsocketAPI';

import type {
  CreateChatBody,
  DeleteChatBody,
  DeleteMessageBody,
  EditMessageBody,
  GetChatMessagesBody,
  Message,
  MessageBody,
  ReadMessageBody,
  SendFileBody,
} from '@/models/socket';
import type {
  CreateMessageMessage,
  CreateSendFile,
  EditDeleteMessageMessage,
} from '../../models';
import type { RootState } from '@/store';

// Send message
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

// Send file
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
    return {
      chatId: Number(data.chatId),
    };
  }
);

// Read message
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

// Edit message
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

// Delete message
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

// Get messages from chat
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

// Create a new chat
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

// Delete chat
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

export {
  sendMessage,
  sendFile,
  readMessage,
  editMessage,
  deleteMessage,
  getChatMessages,
  createChat,
  deleteChat,
};
