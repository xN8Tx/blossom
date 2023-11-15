import databasePool from '../database/postgresql';
import type { MembersDB } from '../typings/database';

class MembersAPI {
  async getByChatId(chatId: number): Promise<MembersDB[]> {
    const members = await databasePool.query<MembersDB>(
      'SELECT * FROM members WHERE "chatId" = $1',
      [chatId],
    );

    return members.rows;
  }

  async getByChatIdAndUserId(
    chatId: number,
    userId: number,
  ): Promise<MembersDB[] | void> {
    try {
      const members = await databasePool.query<MembersDB>(
        'SELECT * FROM members WHERE "chatId" = $1 and "userId" = $2',
        [chatId, userId],
      );

      return members.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async post(chatId: number, userId: number): Promise<void> {
    await databasePool.query(
      'INSERT INTO members ("chatId", "userId") VALUES ($1, $2) ',
      [chatId, userId],
    );
  }
  async delete(id: number) {
    await databasePool.query('DELETE FROM members WHERE id = $1', [id]);
  }
  async deleteByChatId(chatId: number) {
    try {
      await databasePool.query('DELETE FROM members WHERE "chatId" = $1', [
        chatId,
      ]);
    } catch (error) {
      console.log('Error');
    }
  }
}

const membersAPI = new MembersAPI();

export default membersAPI;
