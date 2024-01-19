import { errorLogManager, wsKeyAPI } from 'database';

import type { Request, Response } from 'express';

class WsKeyController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const key = await wsKeyAPI.createKey(id);

      if (!key) {
        errorLogManager.addToLogs(
          'Error in WsKeyController in get',
          `key === undefined`,
        );
        res.status(400).json({ message: 'Invalid access' });
      }

      res.status(200).send({ message: key });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in WsKeyController in get',
        `${(error as Error).message}`,
      );
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const wsKeyController = new WsKeyController();

export default wsKeyController;
