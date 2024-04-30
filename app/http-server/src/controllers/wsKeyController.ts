import CustomFetch from '../services/fetch/customFetch.api';
import logger from '../logger';

import type { Request, Response } from 'express';

const databaseFetch = new CustomFetch('database');

class WsKeyController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const key = await databaseFetch.post(`/ws-key`, { id });

      if (!key) {
        logger.error('Error in WsKeyController in get', `key === undefined`);
        res.status(400).json({ message: 'Invalid access' });
      }

      res.status(200).send({ message: key });
    } catch (error) {
      logger.error(
        'Error in WsKeyController in get',
        `${(error as Error).message}`,
      );
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const wsKeyController = new WsKeyController();

export default wsKeyController;
