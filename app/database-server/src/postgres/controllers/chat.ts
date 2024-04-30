import { Request, Response } from 'express';
import logger from '../../logger';
import { chatAPI } from '../api';

class ChatController {
  async post(req: Request, res: Response) {
    try {
      const { title, type } = req.body;

      const chat = await chatAPI.post(title, type);

      if (!chat) {
        logger.error('⚠️ Error in ChatController post. chat === null');
        res.status(400).json({ message: 'Chat doesnt create' });
      }

      res.status(200).json({ message: chat });
    } catch (error) {
      logger.error('⚠️ Error in ChatController post', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  async getByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const chat = await chatAPI.getByUserId(Number(id));

      if (!chat) {
        logger.error('⚠️ Error in ChatController post. chat === null');
        res.status(400).json({ message: 'Chat doesnt exists' });
      }

      res.status(200).json({ message: chat });
    } catch (error) {
      logger.error('⚠️ Error in ChatController getByUserId', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const chat = await chatAPI.deleteById(Number(id));

      if (!chat) {
        logger.error('⚠️ Error in ChatController post. chat === null');
        res.status(400).json({ message: 'Chat doesnt create' });
      }

      res.status(200).json({ message: id });
    } catch (error) {
      logger.error('⚠️ Error in ChatController deleteById', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

const chatController = new ChatController();

export default chatController;
