import databasePool from '../connector/connector';
import { errorLogManager } from '../../logs-manager';

import type { ContactDB, ContactUserDB } from '../typings/typings';

class ContactsAPI {
  async get(id: number): Promise<ContactUserDB[] | null> {
    try {
      const query = `SELECT
      contacts.id, "contactId", "firstName", "lastName", username, avatar
      FROM contacts
      JOIN users ON contacts."contactId" = users.id
      WHERE "userId" = $1`;

      const contacts = await databasePool.query(query, [id]);

      return contacts.rows;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in ContactsAPI get',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getById(
    userId: number,
    contactId: number,
  ): Promise<ContactDB[] | null> {
    try {
      const contacts = await databasePool.query<ContactDB>(
        'SELECT * FROM contacts WHERE "userId" = $1 AND "contactId" = $2',
        [userId, contactId],
      );

      return contacts.rows;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in ContactsAPI getById',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async post(userId: number, contactId: number): Promise<ContactUserDB | null> {
    try {
      const contacts = await databasePool.query(
        'WITH ins AS (INSERT INTO contacts ("userId", "contactId") VALUES ($1, $2) RETURNING id, "contactId") SELECT ins.id, ins."contactId", users."firstName", users."lastName", users.username, users.avatar FROM ins JOIN users ON users.id = $2',
        [userId, contactId],
      );

      return contacts.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in ContactsAPI post',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async delete(userId: number, contactId: number): Promise<ContactDB | null> {
    try {
      const contact = await databasePool.query<ContactDB>(
        'DELETE FROM contacts WHERE "userId" = $1 AND "contactId" = $2 RETURNING id',
        [userId, contactId],
      );

      return contact.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in ContactsAPI delete',
        (error as Error)?.message,
      );
      return null;
    }
  }
}

const contactsAPI = new ContactsAPI();
export default contactsAPI;
