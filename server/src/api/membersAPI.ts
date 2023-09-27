import databasePool from '../database/postgresql';
import type { MembersDB } from '../typings/database';

class MembersAPI {
  async getByChatId(chatId: number): Promise<MembersDB[]> {
    const members = await databasePool.query<MembersDB>(
      'SELECT * FROM members WHERE chatId = $1',
      [chatId],
    );

    return members.rows;
  }
  async put(chatId: number, userId: number): Promise<void> {
    await databasePool.query(
      'INSERT INTO members (chatId, userId) VALUES ($1, $2)',
      [chatId, userId],
    );
  }
  async delete(id: number) {
    await databasePool.query('DELETE FROM members WHERE id = $1', [id]);
  }
}

const membersAPI = new MembersAPI();

export default membersAPI;
