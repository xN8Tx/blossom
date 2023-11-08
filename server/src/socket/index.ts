import ws from 'ws';

import verifyConnection from './middleware/verifyConnection';
import onGetMessage from './handlers/onGetMessage';
import onMessage from './handlers/onMessage';

import type { WebsocketType, Event } from './socket';
import type { IncomingMessage } from 'http';

const wssStart = () => {
  const wss = new ws.Server(
    {
      port: Number(process.env.WSS_PORT) || 8888,
    },
    () => {
      console.log('Websocket server started on port: ' + process.env.WSS_PORT);
    },
  );

  wss.on('connection', (ws: WebsocketType, req: IncomingMessage) => {
    verifyConnection(ws, req);

    ws.on('message', (stream: string) => {
      const message = JSON.parse(stream);

      switch (message.event as Event) {
        case 'GET_CHAT_MESSAGE': {
          onGetMessage(message, ws);
          break;
        }
        case 'MESSAGE': {
          onMessage(message, ws, wss);
          break;
        }
      }
    });
  });
};

export default wssStart;
