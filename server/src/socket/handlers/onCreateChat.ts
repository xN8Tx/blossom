import ws from 'ws';

import chatAPI from '../../api/chatAPI';
import membersAPI from '../../api/membersAPI';
import usersAPI from '../../api/usersAPI';

import broadcastMessage from '../utils/broadcastMessage';

import type {
  CreateChatBody,
  CreateChatBodyRes,
  Message,
  WebsocketType,
} from 'socket/socket';

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
        },
      },
    };

    const data = JSON.stringify(titleToUser);

    broadcastMessage(wss, titleToCompanion, companionId);
    ws.send(data);
  } catch (error) {
    ws.close();
    console.log('Error in onCreateChat.ts. Error: ' + error);
  }
};

export default onCreateChat;
