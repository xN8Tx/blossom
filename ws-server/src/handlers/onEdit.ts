import ws from 'ws';
import { messagesAPI, membersAPI, errorLogManager } from 'database';

import broadcastMessage from '../utils/broadcastMessage';

import type {
  EditMessageBody,
  EditMessageBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';

const onEdit = async (
  message: Message<EditMessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { userId, companionId, messages, chatId } = message.body;

    if (Number(ws.id) !== Number(userId)) return ws.close();

    const chats = await membersAPI.getByChatIdAndUserId(
      Number(chatId),
      Number(userId),
    );

    if (!chats) {
      errorLogManager.addToLogs(
        'Error in handlers/onCreateChat.ts',
        `chats === null`,
      );
      return ws.close();
    }

    if (chats.length === 0) {
      errorLogManager.addToLogs(
        'Error in handlers/onCreateChat.ts',
        `chats.length === 0`,
      );
      return ws.close();
    }

    const findMessage = await messagesAPI.getById(messages.id);

    if (!findMessage) {
      errorLogManager.addToLogs(
        'Error in handlers/onCreateChat.ts',
        `findMessage === null`,
      );
      return ws.close();
    }

    if (Number(findMessage.userId) !== Number(userId)) {
      errorLogManager.addToLogs(
        'Invalid access in handlers/onCreateChat.ts',
        `Made by ${ws.id}`,
      );
      return ws.close();
    }

    const newMessage = await messagesAPI.edit(
      messages.message,
      Number(messages.id),
    );

    if (!newMessage) {
      errorLogManager.addToLogs(
        'Error in handlers/onCreateChat.ts',
        `newMessage === null`,
      );
      return ws.close();
    }

    const title: Message<EditMessageBodyRes> = {
      event: 'EDIT_MESSAGE',
      body: {
        userId,
        chatId,
        messages: newMessage!,
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

export default onEdit;
