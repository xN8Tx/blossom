import ws from 'ws';
import { messagesAPI, errorLogManager } from 'database';

import broadcastMessage from '../utils/broadcastMessage';

import type { MessagesDB } from 'database';
import type {
  SendFileBody,
  Message,
  WebsocketType,
  SendFileBodyRes,
} from '../typings/socket';

const onSendFile = async (
  message: Message<SendFileBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (Number(ws.id) !== Number(message.body.userId)) return ws.close();

    const { chatId, userId, date } = message.body.message;
    const { file, fileExtension, fileName, fileType } = message.body.file;

    // POST FILE TO SERVER
    const response = await fetch(`${process.env.FILE_SERVER_URL}/`, {
      method: 'POST',
      body: JSON.stringify({
        file,
        fileType,
        fileExtension,
        fileName,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      errorLogManager.addToLogs(
        'Error in UserController in setAvatar',
        `response.status !== 200`,
      );
      return ws.close();
    }

    const fileServerData = await response.json();
    const fileUniqId = fileServerData.message;

    // POST MESSAGE TO DB
    const newMessage = await messagesAPI.postFile(
      chatId,
      userId,
      fileUniqId,
      false,
      date,
    );

    if (newMessage === null) {
      errorLogManager.addToLogs('Error in onMessage', `newMessage === null`);
      return ws.close();
    }

    // SEND MESSAGE TO COMPANION
    const decryptMessage: MessagesDB = {
      ...newMessage,
      message: fileUniqId,
    };

    const title: Message<SendFileBodyRes> = {
      event: 'SEND_FILE',
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

export default onSendFile;
