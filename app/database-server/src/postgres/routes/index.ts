import chat from './chat';
import contacts from './contacts';
import members from './members';
import messages from './messages';
import users from './users';

import type { Express } from 'express';

const configuratePostgresRoutes = (app: Express) => {
  app.use(chat);
  app.use(contacts);
  app.use(members);
  app.use(messages);
  app.use(users);
};

export default configuratePostgresRoutes;
