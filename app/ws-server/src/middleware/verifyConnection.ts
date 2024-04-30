import logger from '../logger';
import CustomFetch from '../services/fetch/customFetch.api';

import type { WebsocketType } from '../typings/socket';
import type { IncomingMessage } from 'http';

const databaseFetch = new CustomFetch('database');

const verifyConnection = async (ws: WebsocketType, req: IncomingMessage) => {
  try {
    const url = req.url;

    if (url === null || url === undefined) {
      throw new Error(
        `Invalid access to websocket. url === null || url === undefined. ${JSON.stringify(req)}`,
      );
    }
    if (url.length < 2) {
      throw new Error(
        `Invalid access to websocket. url.length < 2 ${JSON.stringify(req)}`,
      );
    }

    const key = url.slice(1);

    if (key === undefined || key.length === 0) {
      throw new Error(
        `Invalid access to websocket. key === undefined || key.length === 0. ${JSON.stringify(req)}`,
      );
    }

    const isAuth: false | string = await databaseFetch.post(`/ws-key/check`, {
      key,
    }); // CAN BE FALSE OR ID

    if (isAuth === false) {
      throw new Error(
        `Invalid access to websocket. isAuth === false. ${JSON.stringify(req)}`,
      );
    }

    ws.id = isAuth;
    const title = { event: 'READY' };

    ws.send(JSON.stringify(title));
  } catch (error) {
    logger.error(`Error in verifyConnection. ${JSON.stringify(error)}`);
    ws.close();
  }
};

export default verifyConnection;
