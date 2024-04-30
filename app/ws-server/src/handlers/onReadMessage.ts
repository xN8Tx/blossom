import ws from 'ws';

import verifyActionWithMessage from '../middleware/verifyActionWithMessage';
import CustomFetch from '../services/fetch/customFetch.api';
import broadcastMessage from '../utils/broadcastMessage';
import logger from '../logger';

import type {
  Message,
  ReadMessageBody,
  ReadMessageBodyRes,
  WebsocketType,
} from '../typings/socket';

const databaseFetch = new CustomFetch('database');

const onReadMessage = async (
  message: Message<ReadMessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { userId, chatId, companionId } = message.body;

    // Check is chat exist with that users
    await verifyActionWithMessage(userId.toString(), chatId.toString(), ws);

    await databaseFetch.put('/messages/status', { userId, chatId });

    const title: Message<ReadMessageBodyRes> = {
      event: 'READ_MESSAGE',
      body: {
        chatId: chatId,
      },
    };

    broadcastMessage(wss, title, companionId);
  } catch (error) {
    logger.error(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onReadMessage;
