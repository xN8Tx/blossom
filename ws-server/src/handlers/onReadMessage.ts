import ws from 'ws';
import { messagesAPI, errorLogManager } from 'database';

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
  try {
    if (Number(ws.id) !== Number(message.body.userId)) ws.close();

    const { userId, chatId, companionId } = message.body;

    const messages = await messagesAPI
      .changeMessagesStatus(userId, chatId)
      .then(async () => {
        const messages = await messagesAPI.getByChatId(chatId);
        if (messages === null) {
          errorLogManager.addToLogs(
            'Error in onReadMessage',
            'messages === null',
          );
          return ws.close();
        }
        if (messages.length === 0) {
          return [];
        }
        return messages;
      });

    const title: Message<ReadMessageBodyRes> = {
      event: 'READ_MESSAGE',
      body: {
        chatId: chatId,
        messages: messages!,
      },
    };

    broadcastMessage(wss, title, companionId);
  } catch (error) {
    errorLogManager.addToLogs(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onReadMessage;
