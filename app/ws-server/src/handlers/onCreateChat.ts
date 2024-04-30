import ws from 'ws';

import CustomFetch from '../services/fetch/customFetch.api';
import broadcastMessage from '../utils/broadcastMessage';
import logger from '../logger';

import type { ChatDB, UsersDB } from '../typings/database';
import type {
  CreateChatBody,
  CreateChatBodyRes,
  Message,
  WebsocketType,
} from '../typings/socket';

const databaseFetch = new CustomFetch('database');

const onCreateChat = async (
  message: Message<CreateChatBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (ws.id !== message.body.userId) return ws.close();

    const { userId, companionId } = message.body;

    // create chat
    const newChat = await databaseFetch.post<ChatDB>('/chats', { title: '' });

    // get information about chat users
    const companionInformation = (await databaseFetch.get<UsersDB>(
      `/users/${companionId}`,
    )) as UsersDB;
    const userInformation = (await databaseFetch.get<UsersDB>(
      `/users/${userId}`,
    )) as UsersDB;

    // create chat members
    await databaseFetch.post('/members/', {
      chatId: newChat.id,
      userId: userId,
    });
    await databaseFetch.post('/members/', {
      chatId: newChat.id,
      userId: companionId,
    });

    // Create data to users
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
          isFileLoaded: false,
        },
      },
    };

    const data = JSON.stringify(titleToUser);

    // send data to chat companion
    broadcastMessage(wss, titleToCompanion, companionId);
    // send data to creator of chat
    ws.send(data);
  } catch (error) {
    logger.error(
      'Error in handlers/onCreateChat.ts',
      `${JSON.stringify(error)}`,
    );
    ws.close();
  }
};

export default onCreateChat;
