import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

import type { Express } from 'express';

const routesConfiguration = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
};

export default routesConfiguration;
