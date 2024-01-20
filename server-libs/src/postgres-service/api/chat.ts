import databasePool from '../connector/connector';
import { errorLogManager } from '../../logs-manager';
import { decryptMessages } from '../utils/decryptMessages';

import type { ChatDB, ChatsWithInfoDB, MessagesDB } from '../typings/typings';

class ChatAPI {
  async post(
    title: string | null = null,
    type: boolean | null = null,
  ): Promise<ChatDB | null> {
    try {
      const chatId = await databasePool.query(
        'INSERT INTO chats (title, type) VALUES ($1, $2) RETURNING *',
        [title, type],
      );

      return chatId.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in ChatAPI post',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getByUserId(id: number): Promise<ChatsWithInfoDB[] | null> {
    try {
      const query = `SELECT chats.id, chats.title, ('idle') as "isLoaded", chats.avatar,notification_count as notification,json_build_object('id', mem2."userId",'firstName', users."firstName",'lastName', users."lastName",'username', users.username,'avatar', users.avatar) as user, json_agg(mes) as messages FROM members as mem1 JOIN chats ON chats.id = mem1."chatId" JOIN members as mem2 ON chats.id = mem2."chatId" AND mem2."userId" != $1 JOIN users ON users.id = mem2."userId" FULL JOIN (SELECT DISTINCT ON ("chatId") * FROM messages ORDER BY "chatId", id DESC) mes ON mes."chatId" = chats.id LEFT JOIN (SELECT "chatId", "userId", count(*) as notification_count FROM messages WHERE status = false GROUP BY "chatId", "userId") notification ON (notification."chatId" = chats.id AND notification."userId" = mem2."userId") WHERE mem1."userId" = $1 GROUP BY chats.id, chats.title, chats.avatar, mem2."userId", users."firstName", users."lastName", users.username, users.avatar, notification."chatId", notification."userId", notification_count ORDER BY chats.id;`;
      const chatsWithInfo = await databasePool.query<ChatsWithInfoDB>(query, [
        id,
      ]);

      const result = chatsWithInfo.rows.map((chat) => {
        if (chat.messages[0] == null) {
          chat.messages = [];
        } else {
          chat.messages = decryptMessages(chat.messages) as Omit<
            MessagesDB,
            'chatId'
          >[];
        }

        return chat;
      });

      return result as ChatsWithInfoDB[];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in ChatAPI getByUserId',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async deleteById(id: number): Promise<true | null> {
    try {
      await databasePool.query('DELETE FROM chats WHERE id = $1', [id]);
      return true;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in ChatAPI deleteById',
        (error as Error)?.message,
      );
      return null;
    }
  }
}

const chatAPI = new ChatAPI();

export default chatAPI;
