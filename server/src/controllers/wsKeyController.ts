import wsKeyAPI from '../api/WsKeyAPI';

import type { Request, Response } from 'express';

class WsKeyController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const key = await wsKeyAPI.createKey(id);

      res.status(200).send({ message: key });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const wsKeyController = new WsKeyController();

export default wsKeyController;
