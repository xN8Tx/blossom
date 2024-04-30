import ws from 'ws';

import CustomFetch from '../services/fetch/customFetch.api';
import broadcastMessage from '../utils/broadcastMessage';
import logger from '../logger';

import type { MessagesDB, EditMessageDB } from '../typings/database';
import type {
  EditMessageBody,
  EditMessageBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';
import verifyActionWithMessage from '../middleware/verifyActionWithMessage';

const databaseFetch = new CustomFetch('database');

const onEdit = async (
  message: Message<EditMessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { userId, companionId, messages, chatId } = message.body;

    await verifyActionWithMessage(userId, chatId, ws);

    const findMessage = await databaseFetch.get<MessagesDB>(
      `/messages/${messages.id}`,
    );

    if (Number(findMessage.userId) !== Number(userId)) {
      throw new Error(
        `Invalid access by ${ws.id} try to get access to ${JSON.stringify(message.body)} `,
      );
    }

    const newMessage = await databaseFetch.put<EditMessageDB>(`/messages/`, {
      message: messages.message,
      id: Number(messages.id),
    });

    const title: Message<EditMessageBodyRes> = {
      event: 'EDIT_MESSAGE',
      body: {
        userId,
        chatId,
        messages: newMessage,
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

export default onEdit;
