import code from './code';
import wsKey from './wsKey';

import type { Express } from 'express';

const configurateRedisRoutes = (app: Express) => {
  app.use(code);
  app.use(wsKey);
};

export default configurateRedisRoutes;
