import type ws from 'ws';
import type { ChatsWithInfoDB, MessagesDB } from 'database';

type WebsocketType = ws & {
  id: string;
};

type Event =
  | 'READY'
  | 'MESSAGE'
  | 'SEND_FILE'
  | 'GET_CHAT_MESSAGE'
  | 'READ_MESSAGE'
  | 'EDIT_MESSAGE'
  | 'DELETE_MESSAGE'
  | 'WHO_IS_ONLINE'
  | 'CREATE_CHAT'
  | 'DELETE_CHAT';

type Message<T> = {
  event: Event;
  body: T;
};

type GetChatMessagesBody = {
  chatId: string;
  page: number;
};

type GetChatMessagesBodyRes = {
  chatId: string;
  messages: MessagesDB[];
};

type MessageBody = {
  userId: string;
  companionId: string;
  message: MessagesDB;
};

type MessageBodyRes = {
  chatId: string;
  message: MessagesDB;
};

type OpenBody = {
  userId: string;
  key: string;
};

type ReadMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
};

type ReadMessageBodyRes = {
  chatId: string;
};

type EditMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
  messages: {
    id: string;
    message: string;
  };
};

type EditMessageBodyRes = {
  userId: string;
  chatId: string;
  messages: {
    id: string;
    message: string;
    isEdit: boolean;
  };
};

type DeleteMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
  messages: {
    id: string;
  };
};

type DeleteMessageBodyRes = {
  userId: string;
  chatId: string;
  messages: {
    id: string;
  };
};

type WhoIsOnlineBody = {
  userId: string;
  contactsId: Array<string>;
};

type ContactOnline = {
  id: string;
  status: boolean; // true - online | false - offline
};

type WhoIsOnlineBodyRes = {
  userId: string;
  contactsId: ContactOnline[];
};

type DeleteChatBody = {
  userId: string;
  companionId: string;
  chatId: string;
};

type DeleteChatBodyRes = {
  chatId: string;
};

type SendFileBody = {
  userId: string;
  companionId: string;
  message: MessagesDB;
  file: {
    file: string;
    fileExtension: string;
    fileName: string;
    fileType: string;
  };
};

type SendFileBodyRes = {
  chatId: string;
  message: MessagesDB;
};

type CreateChatBody = {
  userId: string;
  companionId: string;
};

type CreateChatBodyRes = {
  chat: ChatsWithInfoDB;
};

export {
  WebsocketType,
  ReadMessageBody,
  ReadMessageBodyRes,
  Message,
  MessageBody,
  OpenBody,
  GetChatMessagesBody,
  Event,
  GetChatMessagesBodyRes,
  MessageBodyRes,
  EditMessageBody,
  EditMessageBodyRes,
  DeleteMessageBody,
  DeleteMessageBodyRes,
  WhoIsOnlineBody,
  WhoIsOnlineBodyRes,
  ContactOnline,
  DeleteChatBody,
  DeleteChatBodyRes,
  CreateChatBody,
  CreateChatBodyRes,
  SendFileBody,
  SendFileBodyRes,
};
