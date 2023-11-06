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
  message: Omit<MessagesDB, 'id'>;
};

type MessageBodyRes = {
  chatId: string;
  message: MessagesDB;
};

export {
  Message,
  MessageBody,
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  MessageBodyRes,
};
