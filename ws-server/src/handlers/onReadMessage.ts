import ws from 'ws';
import { messagesAPI } from 'database';

import broadcastMessage from '../utils/broadcastMessage';

import type {
  Message,
  ReadMessageBody,
  ReadMessageBodyRes,
  WebsocketType,
} from '../typings/socket';

const onReadMessage = async (
  message: Message<ReadMessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  if (Number(ws.id) !== Number(message.body.userId)) ws.close();

  const { userId, chatId, companionId } = message.body;

  const messages = await messagesAPI
    .changeMessagesStatus(userId, chatId)
    .then(async () => await messagesAPI.getByChatId(chatId));

  const title: Message<ReadMessageBodyRes> = {
    event: 'READ_MESSAGE',
    body: {
      chatId: chatId,
      messages: messages!,
    },
  };

  broadcastMessage(wss, title, companionId);
};

export default onReadMessage;
