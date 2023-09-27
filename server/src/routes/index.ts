import tokenVerify from '../middleware/tokenVerify';
import authRoutes from './authRoutes';

import { Router, type Express } from 'express';

const router = Router();

router.get('/', tokenVerify, (req, res) => {
  res.status(200).json({ message: 'All good' });
});

const routesConfiguration = (app: Express) => {
  app.use('/api/auth', authRoutes);
  app.use('/api', router);
};

export default routesConfiguration;
