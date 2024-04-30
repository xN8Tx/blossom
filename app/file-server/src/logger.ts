import winston from 'winston';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const PROJECT_DIR = path.dirname(path.dirname(__filename));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: `${PROJECT_DIR}/logs/error.log`,
      level: 'error',
    }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
