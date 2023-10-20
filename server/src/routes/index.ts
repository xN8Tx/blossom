import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import contactsRoutes from './contactsRoutes';

import type { Express } from 'express';

const routesConfiguration = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/contacts', contactsRoutes);
};

export default routesConfiguration;
