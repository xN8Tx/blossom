import databasePool from '../database/postgresql';
import { ChatDB, ChatsWithInfoDB } from '../typings/database';

type ChatId = Pick<ChatDB, 'id'>;

class ChatAPI {
  async post(title: string, type: boolean): Promise<ChatId> {
    const chatId = await databasePool.query(
      'INSERT INTO chats (title, type) VALUES ($1, $2) RETURNING id',
      [title, type],
    );

    return chatId.rows[0];
  }

  async getByUserId(id: number): Promise<ChatsWithInfoDB[] | void> {
    try {
      const query = `SELECT chats.id, chats.title, ('idle') as "isLoaded", chats.avatar,notification_count as notification,json_build_object('id', mem2."userId",'firstName', users."firstName",'lastName', users."lastName",'username', users.username,'avatar', users.avatar) as user, json_agg(json_build_object('id', mes.id,'userId', mes."userId",'message', mes.message,'status', mes.status,'date', mes.date, 'isEdit', mes."isEdit")) as messages FROM members as mem1 JOIN chats ON chats.id = mem1."chatId" JOIN members as mem2 ON chats.id = mem2."chatId" AND mem2."userId" != $1 JOIN users ON users.id = mem2."userId" JOIN (SELECT DISTINCT ON ("chatId") * FROM messages ORDER BY "chatId", id DESC) mes ON mes."chatId" = chats.id LEFT JOIN (SELECT "chatId", "userId", count(*) as notification_count FROM messages WHERE status = false GROUP BY "chatId", "userId") notification ON (notification."chatId" = chats.id AND notification."userId" = mem2."userId") WHERE mem1."userId" = $1 GROUP BY chats.id, chats.title, chats.avatar, mem2."userId", users."firstName", users."lastName", users.username, users.avatar, notification."chatId", notification."userId", notification_count ORDER BY chats.id;`;
      const chatsWithInfo = await databasePool.query<ChatsWithInfoDB>(query, [
        id,
      ]);

      return chatsWithInfo.rows;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id: number): Promise<void> {
    await databasePool.query('DELETE FROM chats WHERE id = $1', [id]);
  }
}

const chatAPI = new ChatAPI();

export default chatAPI;
