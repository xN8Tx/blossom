import dotenv from 'dotenv';
import { createClient } from 'redis';

import logger from '../../logger';

import type { RedisClientType } from 'redis';

dotenv.config();

const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => {
  logger.error('Error in redis connector.', err);
});

export default redisClient;
