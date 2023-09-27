import databasePool from '../database/postgresql';
import { ChatDB } from '../typings/database';

type ChatId = Pick<ChatDB, 'id'>;

class ChatAPI {
  async post(title: string, type: boolean): Promise<ChatId> {
    const chatId = await databasePool.query(
      'INSERT INTO chats (title, type) VALUES ($1, $2) RETURNING id',
      [title, type],
    );

    return chatId.rows[0];
  }

  async getById(id: number): Promise<ChatDB> {
    const chat = await databasePool.query<ChatDB>(
      'SELECT * FROM chats WHERE id = $1',
      [id],
    );

    return chat.rows[0];
  }

  async deleteById(id: number): Promise<void> {
    await databasePool.query('DELETE FROM chats WHERE id = $1', [id]);
  }
}

const chatAPI = new ChatAPI();

export default chatAPI;
