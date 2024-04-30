import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import routesConfiguration from './routes/index';

import type { Express } from 'express';
import type { CorsOptions } from 'cors';
import logger from './logger';

dotenv.config();

const httpStart = () => {
  const app: Express = express();
  const PORT = process.env.PORT || 5050;
  const corsConfig: CorsOptions = {
    credentials: true,
    origin: process.env.ORIGIN_URL,
  };

  app.use(json({ limit: '15mb' }));
  app.use(cookieParser());
  app.use(cors(corsConfig));

  routesConfiguration(app);
  app.listen(PORT, () => {
    try {
      console.log('Http server listening on port: ' + PORT);
    } catch (error) {
      logger.error('Htpp server can not start', JSON.stringify(error));
    }
  });
};

httpStart();
