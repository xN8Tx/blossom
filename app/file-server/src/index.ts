import dotenv from 'dotenv';
import express, { json } from 'express';
import cors, { CorsOptions } from 'cors';

import router from './routes/routes';
import logger from './logger';

import { ORIGIN_URL, PORT } from './constant';

dotenv.config();

const corsConfig: CorsOptions = {
  credentials: true,
  origin: ORIGIN_URL,
};
const app = express();

app.use(cors(corsConfig));
app.use(json({ limit: '15mb' }));

app.use(router);

app.listen(PORT, () => {
  try {
    console.log('File server listening on port ' + PORT);
  } catch (error) {
    logger.error(`Error in listening.`, JSON.stringify(error));
  }
});
