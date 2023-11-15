import databasePool from '../database/postgresql';
import type { UserProfileDB, UsersDB } from '../typings/database';

type UserWithoutPassword = Omit<UsersDB, 'password'>;

class UsersAPI {
  async getById(id: string): Promise<UserProfileDB | void> {
    try {
      const user = await databasePool.query<UserProfileDB>(
        'SELECT users.id, users."firstName", users."lastName", users.username, users.avatar FROM users WHERE id = $1',
        [id],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async getAllById(id: string): Promise<UserWithoutPassword | void> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'SELECT id, "firstName", "lastName", username, email, status, avatar FROM users WHERE id = $1',
        [id],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async getByUsername(username: string): Promise<UserProfileDB[] | void> {
    try {
      const user = await databasePool.query<UserProfileDB>(
        'SELECT id, "firstName", "lastName", username, avatar, status FROM users WHERE LOWER(username) LIKE $1',
        [`%${username.toLowerCase()}%`],
      );

      return user.rows;
    } catch (error) {
      console.log(error);
    }
  }
  async post(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
  ): Promise<UserWithoutPassword | void> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'INSERT INTO users ("firstName", "lastName", username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING id, "firstName", "lastName", username, email, avatar, status',
        [firstName, lastName, username, password, email],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async edit(
    firstName: string,
    lastName: string,
    username: string,
    id: number,
  ): Promise<UserWithoutPassword | void> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'UPDATE users SET "firstName" = $1, "lastName" = $2, username = $3 WHERE id = $4 RETURNING id, "firstName", "lastName", username, email, avatar, status',
        [firstName, lastName, username, id],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async editEmail(
    email: string,
    id: number,
  ): Promise<UserWithoutPassword | void> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'UPDATE users SET email = $1 WHERE id = $2 RETURNING id, "firstName", "lastName", username, email, avatar, status',
        [email, id],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async getAllByEmail(email: string): Promise<UsersDB[] | void> {
    try {
      const users = await databasePool.query<UsersDB>(
        'SELECT * FROM users WHERE email = $1',
        [email],
      );

      return users.rows;
    } catch (error) {
      console.log(error);
    }
  }
}

const usersAPI = new UsersAPI();

export default usersAPI;
