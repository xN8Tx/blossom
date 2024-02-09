import ws from 'ws';
import { chatAPI, errorLogManager, membersAPI, usersAPI } from 'database';

import broadcastMessage from '../utils/broadcastMessage';

import type {
  CreateChatBody,
  CreateChatBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';

const onCreateChat = async (
  message: Message<CreateChatBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (ws.id !== message.body.userId) return ws.close();

    const { userId, companionId } = message.body;

    const newChat = await chatAPI.post('');
    const companionInformation = await usersAPI.getById(companionId);
    const userInformation = await usersAPI.getById(message.body.userId);

    if (!newChat) {
      errorLogManager.addToLogs(
        'Error in handlers/onCreateChat.ts',
        'newChat is null',
      );
      return ws.close();
    }
    if (!companionInformation) {
      errorLogManager.addToLogs(
        'Error in handlers/onCreateChat.ts',
        'companionInformation is null',
      );
      return ws.close();
    }
    if (!userInformation) {
      errorLogManager.addToLogs(
        'Error in handlers/onCreateChat.ts',
        'userInformation is null',
      );
      return ws.close();
    }

    await membersAPI.post(newChat.id, Number(userId));
    await membersAPI.post(newChat.id, Number(companionId));

    const titleToUser: Message<CreateChatBodyRes> = {
      event: 'CREATE_CHAT',
      body: {
        chat: {
          id: Number(newChat.id),
          title: newChat.title,
          avatar: newChat.avatar,
          isLoaded: 'idle',
          user: companionInformation!,
          notification: null,
          messages: [],
          maxPages: 0,
          pages: 0,
          isFileLoaded: true,
        },
      },
    };

    const titleToCompanion: Message<CreateChatBodyRes> = {
      event: 'CREATE_CHAT',
      body: {
        chat: {
          id: Number(newChat.id),
          title: newChat.title,
          avatar: newChat.avatar,
          isLoaded: 'idle',
          user: userInformation!,
          notification: null,
          messages: [],
          maxPages: 1,
          pages: 0,
          isFileLoaded: true,
        },
      },
    };

    const data = JSON.stringify(titleToUser);

    broadcastMessage(wss, titleToCompanion, companionId);
    ws.send(data);
  } catch (error) {
    errorLogManager.addToLogs(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default onCreateChat;
