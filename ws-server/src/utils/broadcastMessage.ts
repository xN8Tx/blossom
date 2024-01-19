import ws from 'ws';
import { errorLogManager } from 'database';

import type { Message, WebsocketType } from '../typings/socket';

const broadcastMessage = (
  wss: ws.Server,
  title: Message<unknown>,
  companionId: string,
) => {
  wss.clients.forEach((client) => {
    try {
      if (Number((client as WebsocketType).id) === Number(companionId)) {
        const data = JSON.stringify(title);

        client.send(data);
      }
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in broadcastMessage',
        `${(error as Error).message}`,
      );
      client.close();
    }
  });
};

export default broadcastMessage;
