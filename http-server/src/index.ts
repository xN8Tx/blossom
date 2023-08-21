import dotenv from 'dotenv';
import express from 'express';

import { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();

const PORT: number = Number(process.env.PORT) || 5050;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Blossom HTTP Server');
});

app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
});

export default app;
