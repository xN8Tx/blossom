import ws from 'ws';
import type {
  MessageBody,
  Message,
  WebsocketType,
  MessageBodyRes,
} from '../socket';
import broadcastMessage from '../utils/broadcastMessage';
import messagesAPI from '../../api/messagesAPI';

const onMessage = async (
  message: Message<MessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  if (Number(ws.id) !== Number(message.body.userId)) ws.close();
  const { chatId, userId, message: _mes, date } = message.body.message;
  const newMessage = await messagesAPI.post(chatId, userId, _mes, false, date);

  const title: Message<MessageBodyRes> = {
    event: 'MESSAGE',
    body: {
      chatId: chatId.toString(),
      message: newMessage!,
    },
  };
  const data = JSON.stringify(title);

  ws.send(data);
  broadcastMessage(wss, title, message.body.companionId);
};

export default onMessage;
