import databasePool from '../database/postgresql';

import type { MessagesDB } from '../typings/database';

class MessagesAPI {
  async getByChatId(chatId: string): Promise<MessagesDB[] | void> {
    try {
      const messages = await databasePool.query<MessagesDB>(
        'SELECT * FROM messages WHERE "chatId" = $1 ORDER BY id ASC',
        [chatId],
      );

      return messages.rows;
    } catch (error) {
      console.log(error);
    }
  }
  async post(
    chatId: number,
    userId: number,
    message: string,
    status: boolean,
    date: Date,
  ): Promise<MessagesDB | void> {
    try {
      const _message = await databasePool.query<MessagesDB>(
        'INSERT INTO messages ("chatId", "userId", message, status, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [chatId, userId, message, status, date],
      );

      return _message.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async edit(message: string, id: number): Promise<MessagesDB> {
    const _message = await databasePool.query<MessagesDB>(
      'UPDATE messages SET message = $1, status = $2 WHERE id = $3 RETURNING *',
      [message, true, id],
    );

    return _message.rows[0];
  }
  async delete(id: number): Promise<void> {
    await databasePool.query('DELETE FROM messages WHERE id = $1', [id]);
  }
  async getByUserId(
    userId: number,
    secondUserId: number,
  ): Promise<MessagesDB[] | void> {
    try {
      const query = `SELECT * FROM messages WHERE "chatId" = (SELECT "chatId" FROM "members" WHERE "chatId" = (SELECT "chatId" FROM "members" WHERE "userId" = $2) AND "userId" = $1)`;

      const messages = await databasePool.query<MessagesDB>(query, [
        userId,
        secondUserId,
      ]);

      return messages.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async changeMessagesStatus(userId: string, chatId: string): Promise<void> {
    try {
      await databasePool.query<MessagesDB>(
        'UPDATE messages SET status=true WHERE ("userId" != $1 AND "chatId" = $2 AND status = false)',
        [userId, chatId],
      );
    } catch (error) {
      console.log(error);
    }
  }
}

const messagesAPI = new MessagesAPI();

export default messagesAPI;
