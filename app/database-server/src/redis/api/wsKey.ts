import CryptoJS from 'crypto-js';

import redisClient from '../connector';
import logger from '../../logger';

class WsKeyAPI {
  async create(id: string) {
    try {
      const message = { id: id };

      const key = CryptoJS.AES.encrypt(
        JSON.stringify(message),
        process.env.WS_CRYPT!,
      ).toString();

      await redisClient.connect();
      await redisClient.hSet('code', id, key);
      await redisClient.disconnect();

      return key;
    } catch (error) {
      logger.error('Error in WsKeyAPI in createKey.', error);
      console.log(error);
    }
  }
  async check(key: string) {
    try {
      const decryptKey = CryptoJS.AES.decrypt(
        key,
        process.env.WS_CRYPT!,
      ).toString(CryptoJS.enc.Utf8);

      const message = JSON.parse(decryptKey);

      await redisClient.connect();
      const data = await redisClient.hGet('code', message.id);
      await redisClient.disconnect();

      if (data !== key) {
        logger.error('Error in WsKeyAPI in checkKey. data !== key');
        return false;
      }

      return message.id;
    } catch (error) {
      logger.error('Error in WsKeyAPI in checkKey.', error);
      return false;
    }
  }
}

const wsKeyAPI = new WsKeyAPI();

export default wsKeyAPI;
