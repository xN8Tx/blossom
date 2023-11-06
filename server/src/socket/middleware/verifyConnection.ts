import wsKeyAPI from '../../api/WsKeyAPI';

import type { WebsocketType } from '../../typings/socket';
import type { IncomingMessage } from 'http';

const verifyConnection = async (ws: WebsocketType, req: IncomingMessage) => {
  const url = req.url;

  if (url === null || url === undefined) return ws.close();
  if (url.length < 2) return ws.close();

  const key = url.slice(1);

  if (key === undefined || key.length === 0) return ws.close();
  const isAuth = await wsKeyAPI.checkKey(key); // CAN BE FALSE OR ID

  if (isAuth === false) return ws.close();
  ws.id = isAuth;
};

export default verifyConnection;
