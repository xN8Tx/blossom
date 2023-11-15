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
    await membersAPI.post(newChat.id, Number(userId));
    await membersAPI.post(newChat.id, Number(companionId));

    const title: Message<CreateChatBodyRes> = {
      event: 'CREATE_CHAT',
      body: {
        chat: {
          id: Number(newChat.id),
          isLoading: 'idle',
          title: newChat.title,
          avatar: newChat.avatar,
          user: companionInformation,
          notifications: '',
          messages: [],
        },
      },
    };

    const data = JSON.stringify(title);

    broadcastMessage(wss, title, companionId);
    ws.send(data);
  } catch (error) {
    ws.close();
    console.log('Error in onCreateChat.ts. Error: ' + error);
  }
};

export default onCreateChat;
