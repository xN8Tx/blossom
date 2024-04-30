import CustomFetch from '../services/fetch/customFetch.api';
import logger from '../logger';

import type { Request, Response } from 'express';

const databaseFetch = new CustomFetch('database');

class ChatController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const chats = await databaseFetch.get(`/chats/${id}`);

      res.status(200).json({ message: chats });
    } catch (error) {
      logger.error(
        'Error in ChatController in get',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

const chatController = new ChatController();

export default chatController;
