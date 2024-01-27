import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorLogManager } from 'database';

import verifyConnection from './middleware/verifyConnection';

import onGetMessage from './handlers/onGetMessage';
import onMessage from './handlers/onMessage';
import onReadMessage from './handlers/onReadMessage';
import onEdit from './handlers/onEdit';
import onDelete from './handlers/onDelete';
import onWhoIsOnline from './handlers/onWhoIsOnline';
import onCreateChat from './handlers/onCreateChat';
import onDeleteChat from './handlers/onDeleteChat';

import type { WebsocketType, Event } from './typings/socket';
import type { IncomingMessage } from 'http';
import onSendFile from './handlers/onSendFile';

const wssStart = () => {
  const __filename = fileURLToPath(import.meta.url);
  const PROJECT_DIR = path.dirname(path.dirname(__filename));

  errorLogManager.setPathToLogs(`${PROJECT_DIR}/logs/error.log`);

  const wss = new WebSocketServer(
    {
      port: Number(process.env.WSS_PORT) || 8888,
    },
    () => {
      console.log('Websocket server started on port: ' + process.env.WSS_PORT);
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
