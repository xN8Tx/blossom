import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import configurateRoutes from './routes';
import logger from './logger';

import type { Express } from 'express';
import type { CorsOptions } from 'cors';

dotenv.config();

const httpStart = () => {
  const app: Express = express();
  const PORT = process.env.PORT || 3031;

  const corsConfig: CorsOptions = {
    credentials: true,
    origin: process.env.ORIGIN_URL,
  };

  app.use(json());
  app.use(cookieParser());
  app.use(cors(corsConfig));

  configurateRoutes(app);

  app.listen(PORT, () => {
    try {
      console.log('Database server listening on port: ' + PORT);
    } catch (error) {
      logger.error('Database server can not start', JSON.stringify(error));
    }
  });
};

httpStart();
