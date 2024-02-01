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

    await messagesAPI.changeMessagesStatus(userId, chatId);

    const title: Message<ReadMessageBodyRes> = {
      event: 'READ_MESSAGE',
      body: {
        chatId: chatId,
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
