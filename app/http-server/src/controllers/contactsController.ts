import CustomFetch from '../services/fetch/customFetch.api';
import logger from '../logger';

import type { Request, Response } from 'express';
import type { ContactDB } from '../typings/database';

const databaseFetch = new CustomFetch('database');

class ContactsController {
  async get(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const contacts = await databaseFetch.get(`/contacts/${id}`);

      res.status(200).send({ message: contacts });
    } catch (error) {
      logger.error(
        'Error in ChatController in get',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async post(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { contactId } = req.body;

      // Get current contacts with that id and contactId
      // to check is this contacts doesnt exist
      const contact = await databaseFetch.get<ContactDB[]>(
        `/contacts/${id}/${contactId}`,
      );

      if (!contact)
        throw new Error(`Contact is null. UserId: ${id}. ContactId: ${id}`);
      if (contact.length > 0)
        throw new Error(`Contact is null. UserId: ${id}. ContactId: ${id}`);

      // Create new contact
      const contacts = await databaseFetch.post<ContactDB[]>('/contacts', {
        userId: id,
        contactId,
      });

      if (!contacts)
        throw new Error(
          `Can not create new contact. UserId: ${id}. ContactId: ${id}`,
        );
      res.status(200).send({ message: contacts });
    } catch (error) {
      logger.error(
        'Error in ContactsController in post',
        `${JSON.stringify(error)}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async del(req: Request, res: Response) {
    try {
      const { id, contactId } = req.params;

      // Get current contacts with that id and contactId
      // to check is this contact exist
      const contact = await databaseFetch.get<ContactDB[]>(
        `/contacts/${id}/${contactId}`,
      );

      if (!contact)
        throw new Error(`Contact is null. UserId: ${id}. ContactId: ${id}`);
      if (contact.length === 0)
        throw new Error(`Contact is not null. UserId: ${id}. ContactId: ${id}`);

      const contacts = await databaseFetch.delete(
        `/contacts/${id}/${contactId}`,
      );

      if (!contacts)
        throw new Error(
          `Can not delete contact. UserId: ${id}. ContactId: ${id}`,
        );

      res.status(200).send({ message: contacts });
    } catch (error) {
      logger.error(
        'Error in ContactsController in del',
        `${JSON.stringify(error)}`,
      );
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const contactsController = new ContactsController();

export default contactsController;
