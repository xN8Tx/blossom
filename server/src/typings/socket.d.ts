import type ws from 'ws';
import type { MessagesDB } from './database';

type WebsocketType = ws & {
  id: string;
};

type Event = 'MESSAGE' | 'GET_CHAT_MESSAGE';

type Message<T> = {
  event: Event;
  body: T;
};

type GetChatMessagesBody = {
  chatId: string;
};

type GetChatMessagesBodyRes = GetChatMessagesBody & {
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

export {
  WebsocketType,
  Message,
  MessageBody,
  OpenBody,
  GetChatMessagesBody,
  Event,
  GetChatMessagesBodyRes,
  MessageBodyRes,
};
