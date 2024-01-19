import CryptoJS from 'crypto-js';

import redisClient from '../connector/connector';

class WsKeyAPI {
  async createKey(id: string) {
    try {
      const message = { id: id };

      const key = CryptoJS.AES.encrypt(
        JSON.stringify(message),
        process.env.WS_CRYPT!
      ).toString();

      await redisClient.connect();
      await redisClient.hSet('code', id, key);
      await redisClient.disconnect();

      return key;
    } catch (error) {
      console.log(error);
    }
  }
  async checkKey(key: string) {
    try {
      const decryptKey = CryptoJS.AES.decrypt(
        key,
        process.env.WS_CRYPT!
      ).toString(CryptoJS.enc.Utf8);

      const message = JSON.parse(decryptKey);

      await redisClient.connect();
      const data = await redisClient.hGet('code', message.id);
      await redisClient.disconnect();

      if (data === key) {
        return message.id;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

const wsKeyAPI = new WsKeyAPI();

export default wsKeyAPI;
