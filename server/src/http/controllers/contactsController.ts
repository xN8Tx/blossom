import contactsAPI from '../../api/contactsAPI';

import type { Request, Response } from 'express';

class ContactsController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const contacts = await contactsAPI.get(Number(id));

      res.status(200).send({ message: contacts });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  async post(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { contactId } = req.body;

      const contact = await contactsAPI.getById(Number(id), Number(contactId));

      if (contact!.length > 0) {
        return res.status(403).json({ message: 'Invalid access' });
      }

      const contacts = await contactsAPI.post(Number(id), contactId);

      res.status(200).send({ message: contacts });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  async del(req: Request, res: Response) {
    try {
      const { id, contactId } = req.params;

      const contact = await contactsAPI.getById(Number(id), Number(contactId));

      if (contact!.length === 0) {
        return res.status(403).json({ message: 'Invalid access' });
      }

      const contacts = await contactsAPI.delete(Number(id), Number(contactId));

      res.status(200).send({ message: contacts });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const contactsController = new ContactsController();

export default contactsController;
