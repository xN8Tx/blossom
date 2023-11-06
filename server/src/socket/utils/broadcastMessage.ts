import ws from 'ws';

import type {
  Message,
  MessageBodyRes,
  WebsocketType,
} from '../../typings/socket';

const broadcastMessage = (
  wss: ws.Server,
  title: Message<MessageBodyRes>,
  companionId: string,
) => {
  wss.clients.forEach((client) => {
    if ((client as WebsocketType).id === companionId) {
      const data = JSON.stringify(title);
      client.send(data);
    }
  });
};

export default broadcastMessage;
