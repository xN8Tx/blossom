import { chatAPI, errorLogManager } from 'database';

import type { Request, Response } from 'express';

class ChatController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const chats = await chatAPI.getByUserId(Number(id));

      res.status(200).json({ message: chats });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in ChatController in get',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

const chatController = new ChatController();

export default chatController;
