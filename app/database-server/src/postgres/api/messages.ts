import CryptoJS from 'crypto-js';
import logger from '../../logger';

import databasePool from '../connector';
import { decryptMessages } from '../utils/decryptMessages';

import type { MessagesDB, DeleteMessageDB, EditMessageDB } from '../typings';

class MessagesAPI {
  async getByChatId(
    chatId: string,
    page: number,
  ): Promise<MessagesDB[] | null> {
    try {
      const messages = await databasePool.query<MessagesDB>(
        'SELECT * FROM messages WHERE messages."chatId" = $1 ORDER BY id DESC LIMIT 20 OFFSET $2 * 20;',
        [chatId, page],
      );

      const decrypt = decryptMessages(messages.rows);
      if (!decrypt) return null;

      const reverse = (decrypt as MessagesDB[]).reverse();
      return reverse;
    } catch (error) {
      logger.error(
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
      const cryptMessage = CryptoJS.AES.encrypt(
        message,
        process.env.MESSAGE_CRYPT!,
      ).toString();

      const _message = await databasePool.query<MessagesDB>(
        'INSERT INTO messages ("chatId", "userId", message, status, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [chatId, userId, cryptMessage, status, date],
      );

      return _message.rows[0];
    } catch (error) {
      logger.error('⚠️ Error in MessagesAPI post', (error as Error)?.message);
      return null;
    }
  }
  async postFile(
    chatId: number,
    userId: number,
    message: string,
    status: boolean,
    date: Date,
  ): Promise<MessagesDB | null> {
    try {
      const cryptMessage = CryptoJS.AES.encrypt(
        message,
        process.env.MESSAGE_CRYPT!,
      ).toString();

      const _message = await databasePool.query<MessagesDB>(
        'INSERT INTO messages ("chatId", "userId", message, status, date, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [chatId, userId, cryptMessage, status, date, true],
      );

      return _message.rows[0];
    } catch (error) {
      logger.error(
        '⚠️ Error in MessagesAPI postImage',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async edit(message: string, id: number): Promise<EditMessageDB | null> {
    try {
      if (!process.env.MESSAGE_CRYPT) {
        logger.error(
          'Error in MessagesAPI edit',
          'process.env.MESSAGE_CRYPT === null',
        );
        return null;
      }

      const encryptMessage = CryptoJS.AES.encrypt(
        message,
        process.env.MESSAGE_CRYPT,
      ).toString();

      const messages = await databasePool.query<EditMessageDB>(
        'UPDATE messages SET message = $1, "isEdit" = $2 WHERE id = $3 RETURNING id, message, "isEdit"',
        [encryptMessage, true, id],
      );

      const decrypt: EditMessageDB = {
        ...messages.rows[0],
        message: message,
      };

      return decrypt;
    } catch (error) {
      logger.error('⚠️ Error in MessagesAPI edit', (error as Error)?.message);
      return null;
    }
  }
  async delete(id: number): Promise<DeleteMessageDB | null> {
    try {
      const message = await databasePool.query<DeleteMessageDB>(
        'DELETE FROM messages WHERE id = $1 RETURNING id, message, type',
        [id],
      );

      const decrypt = decryptMessages(message.rows[0]);
      if (!decrypt) {
        logger.error('⚠️ Error in MessagesAPI delete', 'decrypt === null');
        return null;
      }

      return decrypt as DeleteMessageDB;
    } catch (error) {
      logger.error('⚠️ Error in MessagesAPI delete', (error as Error)?.message);
      return null;
    }
  }
  async deleteByChatId(chatId: number): Promise<DeleteMessageDB[] | null> {
    try {
      const message = await databasePool.query<DeleteMessageDB>(
        'DELETE FROM messages WHERE "chatId" = $1 RETURNING id, message, type',
        [chatId],
      );

      const messagesWithMedia = message.rows.filter((m) => m.type === true);

      const decrypt = decryptMessages(messagesWithMedia);
      if (!decrypt) {
        logger.error('⚠️ Error in MessagesAPI delete', 'decrypt === null');
        return null;
      }

      return decrypt as DeleteMessageDB[];
    } catch (error) {
      logger.error(
        '⚠️ Error in MessagesAPI deleteByChatId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getByUserId(
    userId: number,
    contactId: number,
  ): Promise<MessagesDB[] | null> {
    try {
      const query = `SELECT * FROM messages WHERE "chatId" = (SELECT "chatId" FROM "members" WHERE "chatId" = (SELECT "chatId" FROM "members" WHERE "userId" = $2) AND "userId" = $1)`;

      const messages = await databasePool.query<MessagesDB>(query, [
        userId,
        contactId,
      ]);

      const decrypt = decryptMessages(messages.rows);
      if (!decrypt) return null;

      return decrypt as MessagesDB[];
    } catch (error) {
      logger.error(
        '⚠️ Error in MessagesAPI getByUserId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getById(id: number): Promise<MessagesDB | null> {
    try {
      const messages = await databasePool.query<MessagesDB>(
        'SELECT * FROM messages WHERE "id" = $1',
        [id],
      );

      const decrypt = decryptMessages(messages.rows[0]);
      if (!decrypt) return null;

      return decrypt as MessagesDB;
    } catch (error) {
      logger.error(
        '⚠️ Error in MessagesAPI getById',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async changeMessagesStatus(
    userId: number,
    chatId: number,
  ): Promise<true | null> {
    try {
      await databasePool.query<MessagesDB>(
        'UPDATE messages SET status=true WHERE ("userId" != $1 AND "chatId" = $2 AND status = false)',
        [userId, chatId],
      );

      return true;
    } catch (error) {
      logger.error(
        '⚠️ Error in MessagesAPI changeMessagesStatus',
        (error as Error)?.message,
      );
      return null;
    }
  }
}

const messagesAPI = new MessagesAPI();

export default messagesAPI;
