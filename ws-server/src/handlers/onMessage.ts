import ws from 'ws';
import { messagesAPI, errorLogManager } from 'database';

import broadcastMessage from '../utils/broadcastMessage';

import type { MessagesDB } from 'database';
import type {
  MessageBody,
  Message,
  WebsocketType,
  MessageBodyRes,
} from '../typings/socket';

const onMessage = async (
  message: Message<MessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (Number(ws.id) !== Number(message.body.userId)) return ws.close();
    const { chatId, userId, message: _mes, date } = message.body.message;

    const newMessage = await messagesAPI.post(
      chatId,
      userId,
      _mes,
      false,
      date,
    );

    if (newMessage === null) {
      errorLogManager.addToLogs('Error in onMessage', `newMessage === null`);
      return ws.close();
    }

    const decryptMessage: MessagesDB = {
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
    errorLogManager.addToLogs(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onMessage;
