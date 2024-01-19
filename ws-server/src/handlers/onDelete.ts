import ws from 'ws';
import { membersAPI, messagesAPI, errorLogManager } from 'database';

import broadcastMessage from '../utils/broadcastMessage';

import type {
  DeleteMessageBody,
  DeleteMessageBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';

const onDelete = async (
  message: Message<DeleteMessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (Number(ws.id) !== Number(message.body.userId)) return ws.close();

    const { userId, companionId, messages, chatId } = message.body;

    const chats = await membersAPI.getByChatIdAndUserId(
      Number(chatId),
      Number(userId),
    );
    if (chats!.length === 0) return ws.close();

    const deleteMessage = await messagesAPI.delete(Number(messages.id));

    const title: Message<DeleteMessageBodyRes> = {
      event: 'DELETE_MESSAGE',
      body: {
        userId: userId,
        chatId: chatId,
        messages: deleteMessage!,
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

export default onDelete;
