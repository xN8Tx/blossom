import databasePool from '../database';
import type { MessagesDB } from '../typings/database';

class MessagesAPI {
  async getByChatId(chatId: string): Promise<MessagesDB[]> {
    const messages = await databasePool.query<MessagesDB>(
      'SELECT * FROM messages WHERE chatId = $1',
      [chatId],
    );

    return messages.rows;
  }
  async post(
    chatId: number,
    userId: number,
    message: string,
    status: boolean,
    date: Date,
  ): Promise<MessagesDB> {
    const _message = await databasePool.query<MessagesDB>(
      'INSERT INTO chat (chatId, userId, message, status, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [chatId, userId, message, status, date],
    );

    return _message.rows[0];
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
}

const messagesAPI = new MessagesAPI();

export default messagesAPI;
