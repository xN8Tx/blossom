import databasePool from '../database/postgresql';

import type { ContactDB, ContactUserDB } from '../typings/database';

class ContactsAPI {
  async get(id: number): Promise<ContactUserDB[] | void> {
    try {
      const query = `SELECT
      contacts.id, "contactId", "firstName", "lastName", username, avatar
      FROM contacts
      JOIN users ON contacts."contactId" = users.id
      WHERE "userId" = $1`;

      const contacts = await databasePool.query(query, [id]);

      return contacts.rows;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(
    userId: number,
    contactId: number,
  ): Promise<ContactDB[] | void> {
    try {
      const contacts = await databasePool.query<ContactDB>(
        'SELECT * FROM contacts WHERE "userId" = $1 AND "contactId" = $2',
        [userId, contactId],
      );

      return contacts.rows;
    } catch (error) {
      console.log(error);
    }
  }
  async post(userId: number, contactId: number): Promise<ContactUserDB | void> {
    try {
      const contacts = await databasePool.query(
        'WITH ins AS (INSERT INTO contacts ("userId", "contactId") VALUES ($1, $2) RETURNING id, "contactId") SELECT ins.id, ins."contactId", users."firstName", users."lastName", users.username, users.avatar FROM ins JOIN users ON users.id = $2',
        [userId, contactId],
      );

      return contacts.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async delete(userId: number, contactId: number): Promise<ContactDB | void> {
    try {
      const contact = await databasePool.query<ContactDB>(
        'DELETE FROM contacts WHERE "userId" = $1 AND "contactId" = $2 RETURNING id',
        [userId, contactId],
      );

      return contact.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

const contactsAPI = new ContactsAPI();
export default contactsAPI;
