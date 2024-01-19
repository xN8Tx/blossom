import ws from 'ws';

import type { Message, WebsocketType } from '../typings/socket';

const broadcastMessage = (
  wss: ws.Server,
  title: Message<unknown>,
  companionId: string,
) => {
  wss.clients.forEach((client) => {
    if (Number((client as WebsocketType).id) === Number(companionId)) {
      const data = JSON.stringify(title);

      client.send(data);
    }
  });
};

export default broadcastMessage;
