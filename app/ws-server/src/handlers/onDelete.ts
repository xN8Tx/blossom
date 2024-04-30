import ws from 'ws';

import verifyActionWithMessage from '../middleware/verifyActionWithMessage';
import CustomFetch from '../services/fetch/customFetch.api';
import broadcastMessage from '../utils/broadcastMessage';
import logger from '../logger';

import type {
  DeleteMessageBody,
  DeleteMessageBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';
import { DeleteMessageDB } from '../typings/database';

const databaseFetch = new CustomFetch('database');
const fileFetch = new CustomFetch('file');

const onDelete = async (
  message: Message<DeleteMessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { userId, companionId, messages, chatId } = message.body;

    // Check is chat exist with that users
    await verifyActionWithMessage(userId, chatId, ws);

    // Delete message
    const deleteMessage = (await databaseFetch.delete<DeleteMessageDB>(
      `/messages/${messages.id}`,
    )) as DeleteMessageDB;

    // Delete file
    if (deleteMessage?.type === true)
      await fileFetch.delete(`/${deleteMessage.message}`);

    const title: Message<DeleteMessageBodyRes> = {
      event: 'DELETE_MESSAGE',
      body: {
        userId: userId,
        chatId: chatId,
        messages: {
          id: deleteMessage.id,
        },
      },
    };

    broadcastMessage(wss, title, companionId);
  } catch (error) {
    logger.error(
      'Error in handlers/onDeleteChat.ts',
      `${JSON.stringify(error)}`,
    );
    ws.close();
  }
};

export default onDelete;
