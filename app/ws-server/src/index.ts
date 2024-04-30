import { WebSocketServer } from 'ws';

import verifyConnection from './middleware/verifyConnection';

import onEdit from './handlers/onEdit';
import onDelete from './handlers/onDelete';
import onMessage from './handlers/onMessage';
import onSendFile from './handlers/onSendFile';
import onCreateChat from './handlers/onCreateChat';
import onDeleteChat from './handlers/onDeleteChat';
import onGetMessage from './handlers/onGetMessage';
import onReadMessage from './handlers/onReadMessage';
import onWhoIsOnline from './handlers/onWhoIsOnline';

import type { WebsocketType, Event } from './typings/socket';
import type { IncomingMessage } from 'http';
import logger from './logger';

const wssStart = () => {
  const wss = new WebSocketServer(
    {
      port: Number(process.env.WSS_PORT) || 8889,
    },
    () => {
      try {
        console.log(
          'Websocket server started on port: ' + process.env.WSS_PORT,
        );
      } catch (error) {
        logger.error('Websocker server can not start', JSON.stringify(error));
      }
    },
  );

  wss.on('connection', async (ws: WebsocketType, req: IncomingMessage) => {
    await verifyConnection(ws, req);

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
        case 'SEND_FILE': {
          onSendFile(message, ws, wss);
          break;
        }
        case 'READ_MESSAGE': {
          onReadMessage(message, ws, wss);
          break;
        }
        case 'EDIT_MESSAGE': {
          onEdit(message, ws, wss);
          break;
        }
        case 'DELETE_MESSAGE': {
          onDelete(message, ws, wss);
          break;
        }
        case 'WHO_IS_ONLINE': {
          onWhoIsOnline(message, ws, wss);
          break;
        }
        case 'CREATE_CHAT': {
          onCreateChat(message, ws, wss);
          break;
        }
        case 'DELETE_CHAT': {
          onDeleteChat(message, ws, wss);
          break;
        }
      }
    });
  });
};

wssStart();
