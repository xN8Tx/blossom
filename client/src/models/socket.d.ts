import { Messages } from './data';

type Event = 'MESSAGE' | 'GET_CHAT_MESSAGE' | 'READ_MESSAGE';

type Message<T> = {
  event: Event;
  body: T;
};

type GetChatMessagesBody = {
  chatId: string;
};

type GetChatMessagesBodyRes = GetChatMessagesBody & {
  messages: Messages[];
};

type MessageBody = {
  userId: string;
  companionId: string;
  message: Omit<Messages, 'id'>;
};

type MessageBodyRes = {
  chatId: string;
  message: Messages;
};

type ReadMessageBody = {
  userId: string;
  chatId: string;
  companionId: string;
};

type ReadMessageBodyRes = {
  chatId: string;
  messages: Messages[];
};

export {
  Message,
  MessageBody,
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  MessageBodyRes,
  ReadMessageBodyRes,
  ReadMessageBody,
};
