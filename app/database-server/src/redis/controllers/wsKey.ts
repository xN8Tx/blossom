import { Request, Response } from 'express';
import logger from '../../logger';
import { wsKeyAPI } from '../api';

class WsKeyController {
  async create(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const code = await wsKeyAPI.create(id);

      if (!code) {
        logger.error('Error in WsKeyController in create. code === false');
        return res.status(400).json({ message: 'Code is empty/false' });
      }

      res.status(200).json({ message: code });
    } catch (error) {
      logger.error('Error in WsKeyController in create. ', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  async check(req: Request, res: Response) {
    try {
      const { key } = req.body;

      const id = await wsKeyAPI.check(key);

      if (!id) {
        logger.error('Error in WsKeyController in check. key === false');
        return res.status(400).json({ message: 'Key is empty/false' });
      }

      res.status(200).json({ message: id });
    } catch (error) {
      logger.error('Error in WsKeyController in check. ', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

const wsKeyController = new WsKeyController();

export default wsKeyController;
