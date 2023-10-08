import databasePool from '../database/postgresql';
import type { UsersDB } from '../typings/database';

class UsersAPI {
  async getById(id: string): Promise<UsersDB | void> {
    try {
      const user = await databasePool.query<UsersDB>(
        'SELECT users.id, "users.firstName", "users.lastName", users.username FROM users WHERE id = $1',
        [id],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async getAllById(id: string): Promise<UsersDB | void> {
    try {
      const user = await databasePool.query<UsersDB>(
        'SELECT id, "firstName", "lastName", username, email, status, avatar FROM users WHERE id = $1',
        [id],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async getByUsername(username: string): Promise<UsersDB | void> {
    try {
      const user = await databasePool.query<UsersDB>(
        'SELECT id, "firstName", "lastName", username, avatar, status FROM users WHERE username = $1',
        [username],
      );

      return user.rows[0];
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
  ) {
    try {
      const user = await databasePool.query<UsersDB>(
        'INSERT INTO users ("firstName", "lastName", username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
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
  ): Promise<UsersDB | void> {
    try {
      const user = await databasePool.query<UsersDB>(
        'UPDATE users SET "firstName" = $1, "lastName" = $2, username = $3 WHERE id = $4 RETURNING *',
        [firstName, lastName, username, id],
      );

      return user.rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async editEmail(email: string, id: number): Promise<UsersDB | void> {
    try {
      const user = await databasePool.query<UsersDB>(
        'UPDATE users SET email = $1 WHERE id = $2 RETURNING *',
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
