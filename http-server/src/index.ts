import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorLogManager } from 'database';

import routesConfiguration from './routes/index';

import type { Express } from 'express';
import type { CorsOptions } from 'cors';

dotenv.config();

const httpStart = () => {
  const __filename = fileURLToPath(import.meta.url);
  const PROJECT_DIR = path.dirname(path.dirname(__filename));

  errorLogManager.setPathToLogs(`${PROJECT_DIR}/logs/error.log`);

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
    console.log('Server listening on port: ' + PORT);
  });
};

httpStart();
