import ws from 'ws';

import CustomFetch from '../services/fetch/customFetch.api';
import broadcastMessage from '../utils/broadcastMessage';
import logger from '../logger';

import type { MessagesDB } from '../typings/database';
import type {
  DeleteChatBody,
  DeleteChatBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';
import verifyActionWithMessage from '../middleware/verifyActionWithMessage';

const databaseFetch = new CustomFetch('database');
const fileFetch = new CustomFetch('file');

const onDeleteChat = async (
  message: Message<DeleteChatBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { userId, companionId, chatId } = message.body;

    await verifyActionWithMessage(userId, chatId, ws);

    // Delete all info
    const messagesWithMedia = (await databaseFetch.delete<MessagesDB[]>(
      `/messages/chatId/${chatId}`,
    )) as MessagesDB[];
    await databaseFetch.delete(`/members/deleteByChatId/${chatId}`);
    await databaseFetch.delete(`/chats/${chatId}`);

    // Delete files
    if (messagesWithMedia?.length !== 0) {
      messagesWithMedia.forEach(async (message) => {
        await fileFetch.delete(`/${message.message}`);
      });
    }

    // Send info about delete
    const title: Message<DeleteChatBodyRes> = {
      event: 'DELETE_CHAT',
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

export default onDeleteChat;
