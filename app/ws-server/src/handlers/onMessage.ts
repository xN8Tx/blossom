import ws from 'ws';

import verifyActionWithMessage from '../middleware/verifyActionWithMessage';
import CustomFetch from '../services/fetch/customFetch.api';
import broadcastMessage from '../utils/broadcastMessage';
import logger from '../logger';

import type { MessagesDB } from '../typings/database';
import type {
  MessageBody,
  Message,
  WebsocketType,
  MessageBodyRes,
} from '../typings/socket';

const databaseFetch = new CustomFetch('database');

const onMessage = async (
  message: Message<MessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { chatId, userId, message: _mes, date } = message.body.message;

    // Check is chat exist with that users
    await verifyActionWithMessage(userId.toString(), chatId.toString(), ws);

    const newMessage = await databaseFetch.post<MessagesDB>('/messages', {
      date,
      chatId,
      userId,
      message: _mes,
      status: false,
    });

    if (!newMessage) {
      throw new Error(
        `newMessage === null. Message.body: ${JSON.stringify(message.body)}`,
      );
    }

    const decryptMessage = {
      ...newMessage,
      message: _mes,
    };

    const title: Message<MessageBodyRes> = {
      event: 'MESSAGE',
      body: {
        chatId: chatId.toString(),
        message: decryptMessage,
      },
    };
    const data = JSON.stringify(title);

    broadcastMessage(wss, title, message.body.companionId);
    ws.send(data);
  } catch (error) {
    logger.error('Error in handlers/onMessage.ts', `${JSON.stringify(error)}`);
    ws.close();
  }
};

export default onMessage;
