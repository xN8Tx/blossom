import ws from 'ws';

import type { Message, WebsocketType } from '../socket';

const broadcastMessage = (
  wss: ws.Server,
  title: Message<unknown>,
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
