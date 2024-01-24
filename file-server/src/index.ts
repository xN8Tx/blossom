import dotenv from 'dotenv';
import express, { json } from 'express';
import cors, { CorsOptions } from 'cors';
import { errorLogManager } from 'database';

import router from './routes/routes';

import { ORIGIN_URL, PORT } from './constant';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const corsConfig: CorsOptions = {
  credentials: true,
  origin: ORIGIN_URL,
};
const app = express();

app.use(cors(corsConfig));
app.use(json({ limit: '10mb' }));

const __filename = fileURLToPath(import.meta.url);
const PROJECT_DIR = path.dirname(path.dirname(__filename));

errorLogManager.setPathToLogs(`${PROJECT_DIR}/logs/error.log`);

app.use(router);

app.listen(PORT, () => {
  try {
    console.log('File server listening on port ' + PORT);
  } catch (error) {
    errorLogManager.addToLogs('Error in listening.', JSON.stringify(error));
  }
});
