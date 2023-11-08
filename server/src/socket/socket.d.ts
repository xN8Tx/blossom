import type ws from 'ws';
import type { MessagesDB } from '../typings/database';

type WebsocketType = ws & {
  id: string;
};

type Event = 'MESSAGE' | 'GET_CHAT_MESSAGE' | 'READ_MESSAGE';

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

type ReadMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
};

type ReadMessageBodyRes = {
  chatId: string;
  messages: MessagesDB[];
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
};
