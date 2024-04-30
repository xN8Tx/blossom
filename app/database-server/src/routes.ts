import configuratePostgresRoutes from './postgres/routes';
import configurateRedisRoutes from './redis/routes';

import type { Express } from 'express';

const configurateRoutes = (app: Express) => {
  configurateRedisRoutes(app);
  configuratePostgresRoutes(app);
};

export default configurateRoutes;
