import { errorLogManager } from '../../logs-manager';
import databasePool from '../connector/connector';

import type { MessagesDB } from '../typings/typings';

type EditMessageDB = {
  id: string;
  message: string;
  isEdit: boolean;
};

type DeleteMessageDB = {
  id: string;
};

class MessagesAPI {
  async getByChatId(chatId: string): Promise<MessagesDB[] | null> {
    try {
      const messages = await databasePool.query<MessagesDB>(
        'SELECT * FROM messages WHERE "chatId" = $1 ORDER BY id ASC',
        [chatId],
      );

      return messages.rows;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI getByChatId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async post(
    chatId: number,
    userId: number,
    message: string,
    status: boolean,
    date: Date,
  ): Promise<MessagesDB | null> {
    try {
      const _message = await databasePool.query<MessagesDB>(
        'INSERT INTO messages ("chatId", "userId", message, status, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [chatId, userId, message, status, date],
      );

      return _message.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI post',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async edit(message: string, id: number): Promise<EditMessageDB | null> {
    try {
      const _message = await databasePool.query<EditMessageDB>(
        'UPDATE messages SET message = $1, "isEdit" = $2 WHERE id = $3 RETURNING id, message, "isEdit"',
        [message, true, id],
      );

      return _message.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI edit',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async delete(id: number): Promise<DeleteMessageDB | null> {
    try {
      const message = await databasePool.query<DeleteMessageDB>(
        'DELETE FROM messages WHERE id = $1 RETURNING id',
        [id],
      );

      return message.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI delete',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async deleteByChatId(chatId: number): Promise<DeleteMessageDB | null> {
    try {
      const message = await databasePool.query<DeleteMessageDB>(
        'DELETE FROM messages WHERE "chatId" = $1',
        [chatId],
      );

      return message.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI deleteByChatId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getByUserId(
    userId: number,
    secondUserId: number,
  ): Promise<MessagesDB[] | null> {
    try {
      const query = `SELECT * FROM messages WHERE "chatId" = (SELECT "chatId" FROM "members" WHERE "chatId" = (SELECT "chatId" FROM "members" WHERE "userId" = $2) AND "userId" = $1)`;

      const messages = await databasePool.query<MessagesDB>(query, [
        userId,
        secondUserId,
      ]);

      return messages.rows;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI getByUserId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getById(id: string): Promise<MessagesDB | null> {
    try {
      const messages = await databasePool.query<MessagesDB>(
        'SELECT * FROM messages WHERE "id" = $1',
        [id],
      );

      return messages.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI getById',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async changeMessagesStatus(
    userId: string,
    chatId: string,
  ): Promise<true | null> {
    try {
      await databasePool.query<MessagesDB>(
        'UPDATE messages SET status=true WHERE ("userId" != $1 AND "chatId" = $2 AND status = false)',
        [userId, chatId],
      );

      return true;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in MessagesAPI changeMessagesStatus',
        (error as Error)?.message,
      );
      return null;
    }
  }
}

const messagesAPI = new MessagesAPI();

export default messagesAPI;
