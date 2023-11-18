import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routesConfiguration from './routes/index';

import type { Express } from 'express';
import type { CorsOptions } from 'cors';

const httpStart = () => {
  const app: Express = express();
  const PORT = process.env.PORT || 5050;
  const corsConfig: CorsOptions = {
    credentials: true,
    origin: process.env.ORIGIN_URL,
  };

  app.use(json({ limit: '10mb' }));
  app.use(cookieParser());
  app.use(cors(corsConfig));

  routesConfiguration(app);

  app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
  });
};

export default httpStart;
