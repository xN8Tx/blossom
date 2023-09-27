import redisClient from '../database/redis';

const EXPIRATION: number = 120;

class CodeAPI {
  async create(email: string) {
    const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);

    await redisClient.connect();
    await redisClient.setEx(email, EXPIRATION, `${code}`);
    await redisClient.disconnect();

    return code;
  }
  async check(email: string, code: number) {
    try {
      await redisClient.connect();
      const _code = await redisClient.get(email);
      await redisClient.disconnect();

      if (code !== Number(_code)) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}

const codeAPI = new CodeAPI();

export default codeAPI;
