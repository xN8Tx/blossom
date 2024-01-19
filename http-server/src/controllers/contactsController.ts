import { contactsAPI, errorLogManager } from 'database';

import type { Request, Response } from 'express';

class ContactsController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const contacts = await contactsAPI.get(Number(id));

      res.status(200).send({ message: contacts });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in ChatController in get',
        `${JSON.stringify(req.body)}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async post(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { contactId } = req.body;

      const contact = await contactsAPI.getById(Number(id), Number(contactId));

      if (!contact) {
        errorLogManager.addToLogs(
          'Error in ContactsController in post: contact === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(403).json({ message: 'Invalid access' });
      }

      if (contact!.length > 0) {
        errorLogManager.addToLogs(
          'Error in ContactsController in post: double contact add',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(403).json({ message: 'Invalid access' });
      }

      const contacts = await contactsAPI.post(Number(id), contactId);

      if (!contacts) {
        errorLogManager.addToLogs(
          'Error in ContactsController in post. contacts === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(500).json({ message: 'Error post' });
      }
      res.status(200).send({ message: contacts });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in ContactsController in post',
        `${JSON.stringify(req.body)}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async del(req: Request, res: Response) {
    try {
      const { id, contactId } = req.params;

      const contact = await contactsAPI.getById(Number(id), Number(contactId));

      if (!contact) {
        errorLogManager.addToLogs(
          'Error in ContactsController in del: contact === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(403).json({ message: 'Invalid access' });
      }

      if (contact!.length === 0) {
        return res.status(403).json({ message: 'Invalid access' });
      }

      const contacts = await contactsAPI.delete(Number(id), Number(contactId));

      if (!contacts) {
        errorLogManager.addToLogs(
          'Error in ContactsController in del. contacts === null',
          `${JSON.stringify(req.body)}`,
        );
        return res.status(500).json({ message: 'Error post' });
      }

      res.status(200).send({ message: contacts });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in ContactsController in del',
        `${(error as Error).message}`,
      );
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const contactsController = new ContactsController();

export default contactsController;
