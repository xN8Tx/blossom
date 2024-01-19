import dotenv from 'dotenv';
import { RedisClientType, createClient } from 'redis';

dotenv.config();

let redisClient: RedisClientType;

if (process.env.NODE_ENV === 'production') {
  redisClient = createClient({
    url: process.env.REDIS_URL,
  });
} else {
  redisClient = createClient();
}

redisClient.on('error', (err) => {
  console.log('[REDIS ERROR] ', err);
});

export default redisClient;
