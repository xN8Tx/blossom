import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import type { Express } from 'express';
import type { CorsOptions } from 'cors';

import routesConfiguration from './routes/index';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5050;
const corsConfig: CorsOptions = {
  credentials: true,
  origin: process.env.ORIGIN_URL,
};

app.use(json());
app.use(cookieParser());
app.use(cors(corsConfig));

routesConfiguration(app);

app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

export default app;
