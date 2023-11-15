import ws from 'ws';

import membersAPI from '../../api/membersAPI';
import messagesAPI from '../../api/messagesAPI';
import chatAPI from '../../api/chatAPI';

import broadcastMessage from '../utils/broadcastMessage';

import type {
  DeleteChatBody,
  DeleteChatBodyRes,
  Message,
  WebsocketType,
} from '../socket';

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
    ws.close();
    console.log('Error in onDeleteChat! Error: ' + error);
  }
};

export default onDeleteChat;
