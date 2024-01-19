import { wsKeyAPI } from 'database';
import { errorLogManager } from 'database';

import type { WebsocketType } from '../typings/socket';
import type { IncomingMessage } from 'http';

const verifyConnection = async (ws: WebsocketType, req: IncomingMessage) => {
  try {
    const url = req.url;

    if (url === null || url === undefined) {
      errorLogManager.addToLogs(
        'Invalid access to websocket. url === null || url === undefined',
        `${JSON.stringify(req)}`,
      );
      return ws.close();
    }
    if (url.length < 2) {
      errorLogManager.addToLogs(
        'Invalid access to websocket. url.length < 2',
        `${JSON.stringify(req)}`,
      );
      return ws.close();
    }

    const key = url.slice(1);

    if (key === undefined || key.length === 0) {
      errorLogManager.addToLogs(
        'Invalid access to websocket. key === undefined || key.length === 0',
        `${JSON.stringify(req)}`,
      );
      return ws.close();
    }
    const isAuth: false | string = await wsKeyAPI.checkKey(key); // CAN BE FALSE OR ID

    if (isAuth === false) {
      errorLogManager.addToLogs(
        'Invalid access to websocket. isAuth === false',
        `${JSON.stringify(req)}`,
      );
      return ws.close();
    }

    ws.id = isAuth;
    const title = { event: 'READY' };

    ws.send(JSON.stringify(title));
  } catch (error) {
    errorLogManager.addToLogs(
      'Error in handlers/onCreateChat.ts',
      `${(error as Error).message}`,
    );
    ws.close();
  }
};

export default verifyConnection;
