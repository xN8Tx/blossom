import ws from 'ws';

import verifyActionWithMessage from '../middleware/verifyActionWithMessage';
import CustomFetch from '../services/fetch/customFetch.api';
import broadcastMessage from '../utils/broadcastMessage';
import logger from '../logger';

import type { MessagesDB } from '../typings/database';
import type {
  SendFileBody,
  Message,
  WebsocketType,
  SendFileBodyRes,
} from '../typings/socket';

const databaseFetch = new CustomFetch('database');
const fileFetch = new CustomFetch('file');

const onSendFile = async (
  message: Message<SendFileBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    const { chatId, userId, date } = message.body.message;
    const { file, fileExtension, fileName, fileType } = message.body.file;

    // Check is chat exist with that users
    await verifyActionWithMessage(userId.toString(), chatId.toString(), ws);

    // POST FILE TO SERVER
    const fileUniqId = await fileFetch.post<string>(`/`, {
      file,
      fileType,
      fileExtension,
      fileName,
    });

    // POST MESSAGE TO DB
    const newMessage = await databaseFetch.post<MessagesDB>('/messages/file', {
      date,
      chatId,
      userId,
      message: fileUniqId,
      status: false,
    });

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
    logger.error(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onSendFile;
