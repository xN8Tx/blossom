import databasePool from '../connector';
import logger from '../../logger';

import type { MembersDB } from '../typings';

class MembersAPI {
  async getByChatId(chatId: number): Promise<MembersDB[] | null> {
    try {
      const members = await databasePool.query<MembersDB>(
        'SELECT * FROM members WHERE "chatId" = $1',
        [chatId],
      );

      return members.rows;
    } catch (error) {
      logger.error(
        '⚠️ Error in MembersAPI getByChatId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getByChatIdAndUserId(
    chatId: number,
    userId: number,
  ): Promise<MembersDB[] | null> {
    try {
      const members = await databasePool.query<MembersDB>(
        'SELECT * FROM members WHERE "chatId" = $1 and "userId" = $2',
        [chatId, userId],
      );

      return members.rows;
    } catch (error) {
      logger.error(
        '⚠️ Error in MembersAPI getByChatIdAndUserId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async post(chatId: number, userId: number): Promise<true | null> {
    try {
      await databasePool.query(
        'INSERT INTO members ("chatId", "userId") VALUES ($1, $2) ',
        [chatId, userId],
      );
      return true;
    } catch (error) {
      logger.error('⚠️ Error in MembersAPI post', (error as Error)?.message);
      return null;
    }
  }
  async delete(id: number): Promise<true | null> {
    try {
      await databasePool.query('DELETE FROM members WHERE id = $1', [id]);
      return true;
    } catch (error) {
      logger.error('⚠️ Error in MembersAPI delete', (error as Error)?.message);
      return null;
    }
  }
  async deleteByChatId(chatId: number): Promise<true | null> {
    try {
      await databasePool.query('DELETE FROM members WHERE "chatId" = $1', [
        chatId,
      ]);
      return true;
    } catch (error) {
      logger.error(
        '⚠️ Error in MembersAPI deleteByChatId',
        (error as Error)?.message,
      );
      return null;
    }
  }
}

const membersAPI = new MembersAPI();

export default membersAPI;
