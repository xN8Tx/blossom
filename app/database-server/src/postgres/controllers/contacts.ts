import { Request, Response } from 'express';
import logger from '../../logger';
import { contactsAPI } from '../api';

class ContactsController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const contact = await contactsAPI.get(Number(id));

      if (!contact) {
        logger.error('Error in ContactsController in get. contact === null');
        return res.status(400).json({ message: 'Contact is null' });
      }

      res.status(200).json({ message: contact });
    } catch (error) {
      logger.error(
        'Error in ChatController in get',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { userId, contactId } = req.params;

      const contact = await contactsAPI.getById(
        Number(userId),
        Number(contactId),
      );

      if (!contact) {
        logger.error('Error in ContactsController in get. contact === null');
        return res.status(400).json({ message: 'Contact is null' });
      }

      res.status(200).json({ message: contact });
    } catch (error) {
      logger.error(
        'Error in ChatController in getById',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  async post(req: Request, res: Response) {
    try {
      const { userId, contactId } = req.body;

      const contact = await contactsAPI.post(Number(userId), Number(contactId));

      if (!contact) {
        logger.error('Error in ContactsController in post. contact === null');
        return res.status(400).json({ message: 'Contact is null' });
      }

      res.status(200).json({ message: contact });
    } catch (error) {
      logger.error(
        'Error in ChatController in post',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { userId, contactId } = req.params;

      const contact = await contactsAPI.delete(
        Number(userId),
        Number(contactId),
      );

      if (!contact) {
        logger.error('Error in ContactsController in delete. contact === null');
        return res.status(400).json({ message: 'Contact is null' });
      }

      res.status(200).json({ message: contact });
    } catch (error) {
      logger.error(
        'Error in ChatController in delete',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

const contactsController = new ContactsController();

export default contactsController;
