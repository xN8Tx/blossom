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
    if (!chats || chats!.length === 0) {
      errorLogManager.addToLogs(
        `Error in handlers/onDeleteChat.ts. UserId: ${userId}, chatId: ${chatId}, companionId: ${companionId}`,
        `chats === null`,
      );
      return ws.close();
    }

    const deleteMessage = await messagesAPI.delete(Number(messages.id));

    if (!deleteMessage) {
      errorLogManager.addToLogs(
        'Error in handlers/onDeleteChat.ts',
        `delete message === null`,
      );
      return ws.close();
    }

    // DELETE FILE

    if (deleteMessage?.type === true) {
      const response = await fetch(
        `${process.env.FILE_SERVER_URL}/${deleteMessage.message}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log(response);

      if (!response.ok) {
        errorLogManager.addToLogs(
          `Error in onDelete. File id === ${deleteMessage.message}`,
          `response.status !== 200`,
        );
      }
    }

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
    errorLogManager.addToLogs(
      'Error in handlers/onDeleteChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onDelete;
