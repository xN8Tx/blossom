import logger from '../logger';

import verifyActionWithMessage from '../middleware/verifyActionWithMessage';
import CustomFetch from '../services/fetch/customFetch.api';
import { MessagesDB } from '../typings/database';

import type {
  GetChatMessagesBody,
  GetChatMessagesBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';

const databaseFetch = new CustomFetch('database');

const onGetMessage = async (
  message: Message<GetChatMessagesBody>,
  ws: WebsocketType,
) => {
  try {
    const chatId = message.body.chatId;
    const page = message.body.page;
    const userId = ws.id;

    // Check is chat exist with that users
    await verifyActionWithMessage(userId, chatId, ws);

    const messages = await databaseFetch.get<MessagesDB[]>(
      `/messages/${chatId}/${page}`,
    );

    const title: Message<GetChatMessagesBodyRes> = {
      event: 'GET_CHAT_MESSAGE',
      body: {
        chatId: chatId,
        messages: messages as MessagesDB[],
      },
    };
    const data = JSON.stringify(title);

    ws.send(data);
  } catch (error) {
    logger.error(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onGetMessage;
