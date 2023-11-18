import ws from 'ws';

import broadcastMessage from '../utils/broadcastMessage';
import messagesAPI from '../../api/messagesAPI';
import imageAPI from '../../api/imageAPI';
import isMessageImage from '../utils/isMessageImage';

import type {
  MessageBody,
  Message,
  WebsocketType,
  MessageBodyRes,
} from '../socket';

const onMessage = async (
  message: Message<MessageBody>,
  ws: WebsocketType,
  wss: ws.Server,
) => {
  try {
    if (Number(ws.id) !== Number(message.body.userId)) return ws.close();
    const { chatId, userId, message: _mes, date } = message.body.message;

    let messageText = _mes;
    if (isMessageImage(_mes)) {
      messageText = (await imageAPI.madeWebpFromBase64(_mes)) as string;
    }

    const newMessage = await messagesAPI.post(
      chatId,
      userId,
      messageText,
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
