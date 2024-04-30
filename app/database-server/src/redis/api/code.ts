import logger from '../../logger';
import redisClient from '../connector';

const EXPIRATION: number = 120;

class CodeAPI {
  async create(email: string) {
    try {
      const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

      await redisClient.connect();
      await redisClient.setEx(email, EXPIRATION, `${code}`);
      await redisClient.disconnect();

      return code;
    } catch (error) {
      logger.error('Error in CodeAPI in create.', error);
      return false;
    }
  }
  async check(email: string, code: number) {
    try {
      await redisClient.connect();
      const _code = await redisClient.get(email);
      await redisClient.disconnect();

      if (Number(code) !== Number(_code)) {
        logger.error('Error in CodeAPI in check. code !== _code');
        return false;
      }

      return true;
    } catch (error) {
      logger.error('Error in CodeAPI in check.', error);
      return false;
    }
  }
}

const codeAPI = new CodeAPI();

export default codeAPI;
