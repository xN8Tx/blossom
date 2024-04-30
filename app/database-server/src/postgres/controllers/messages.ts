import { Request, Response } from 'express';
import logger from '../../logger';
import { messagesAPI } from '../api';

class MessagesController {
  async getByChatId(req: Request, res: Response) {
    try {
      const { chatId, page } = req.params;

      const messages = await messagesAPI.getByChatId(chatId, Number(page));

      if (!messages) {
        logger.error(
          'Error in MessagesController in getByChatId. messages === null',
        );
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in getByChatId', error);
    }
  }

  async post(req: Request, res: Response) {
    try {
      const { chatId, userId, message, status, date } = req.body;

      const messages = await messagesAPI.post(
        Number(chatId),
        Number(userId),
        message,
        status,
        date,
      );

      if (!messages) {
        logger.error('Error in MessagesController in post. messages === null');
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in post', error);
    }
  }

  async postFile(req: Request, res: Response) {
    try {
      const { chatId, userId, message, status, date } = req.body;

      const messages = await messagesAPI.postFile(
        Number(chatId),
        Number(userId),
        message,
        status,
        date,
      );

      if (!messages) {
        logger.error(
          'Error in MessagesController in postFile. messages === null',
        );
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in postFile', error);
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { message, id } = req.body;

      const messages = await messagesAPI.edit(message, Number(id));

      if (!messages) {
        logger.error('Error in MessagesController in edit. messages === null');
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in edit', error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const messages = await messagesAPI.delete(Number(id));

      if (!messages) {
        logger.error(
          'Error in MessagesController in delete. messages === null',
        );
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in delete', error);
    }
  }

  async deleteByChatId(req: Request, res: Response) {
    try {
      const { chatId } = req.params;

      const messages = await messagesAPI.deleteByChatId(Number(chatId));

      if (!messages) {
        logger.error(
          'Error in MessagesController in deleteByChatId. messages === null',
        );
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in deleteByChatId', error);
    }
  }

  async getByUserId(req: Request, res: Response) {
    try {
      const { userId, contactId } = req.params;

      const messages = await messagesAPI.getByUserId(
        Number(userId),
        Number(contactId),
      );

      if (!messages) {
        logger.error(
          'Error in MessagesController in getByUserId. messages === null',
        );
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in getByUserId', error);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const messages = await messagesAPI.getById(Number(id));

      if (!messages) {
        logger.error(
          'Error in MessagesController in getById. messages === null',
        );
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error('Error in MessagesController in getById', error);
    }
  }

  async changeMessagesStatus(req: Request, res: Response) {
    try {
      const { userId, chatId } = req.body;

      const messages = await messagesAPI.changeMessagesStatus(
        Number(userId),
        Number(chatId),
      );

      if (!messages) {
        logger.error(
          'Error in MessagesController in changeMessagesStatus. messages === null',
        );
        return res.status(400).json({ message: 'Messages is null' });
      }

      res.status(200).json({ message: messages });
    } catch (error) {
      logger.error(
        'Error in MessagesController in changeMessagesStatus',
        error,
      );
    }
  }
}

const messagesController = new MessagesController();

export default messagesController;
