import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import contactsRoutes from './contactsRoutes';
import chatRoutes from './chatRoutes';
import wsKeyRoutes from './wsKeyRoutes';

import type { Express } from 'express';

const routesConfiguration = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/contacts', contactsRoutes);
  app.use('/api/chats', chatRoutes);
  app.use('/api/ws', wsKeyRoutes);
};

export default routesConfiguration;
