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
    if (chats!.length === 0) return ws.close();

    const findMessage = await messagesAPI.getById(messages.id);
    if (Number(findMessage!.userId) !== Number(userId)) return ws.close();

    const newMessage = await messagesAPI.edit(
      messages.message,
      Number(messages.id),
    );

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
