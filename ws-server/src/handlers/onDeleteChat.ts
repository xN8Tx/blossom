import ws from 'ws';
import { chatAPI, membersAPI, messagesAPI, errorLogManager } from 'database';

import broadcastMessage from '../utils/broadcastMessage';

import type {
  DeleteChatBody,
  DeleteChatBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';

const onDeleteChat = async (
  message: Message<DeleteChatBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (Number(ws.id) !== Number(message.body.userId)) return ws.close();

    const { userId, companionId, chatId } = message.body;

    const isMember = await membersAPI.getByChatIdAndUserId(
      Number(chatId),
      Number(userId),
    );
    if (!isMember || isMember!.length === 0) return ws.close();

    await messagesAPI.deleteByChatId(Number(chatId));
    await membersAPI.deleteByChatId(Number(chatId));
    await chatAPI.deleteById(Number(chatId));

    const title: Message<DeleteChatBodyRes> = {
      event: 'DELETE_CHAT',
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

export default onDeleteChat;
