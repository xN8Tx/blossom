import { chatAPI } from 'database';

import type { Request, Response } from 'express';

class ChatController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const chats = await chatAPI.getByUserId(Number(id));

      res.status(200).json({ message: chats });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const chatController = new ChatController();

export default chatController;
