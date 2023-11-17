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

    const title: Message<MessageBodyRes> = {
      event: 'MESSAGE',
      body: {
        chatId: chatId.toString(),
        message: newMessage!,
      },
    };
    const data = JSON.stringify(title);

    broadcastMessage(wss, title, message.body.companionId);
    ws.send(data);
  } catch (error) {
    ws.close();
    console.log('Error in onMessage.ts. Error: ' + error);
  }
};

export default onMessage;
