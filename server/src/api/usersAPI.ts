import databasePool from '../database';
import type { UsersDB } from '../typings/database';

class UsersAPI {
  async getById(id: string): Promise<UsersDB> {
    const user = await databasePool.query<UsersDB>(
      'SELECT users.id, users.firstName, users.secondName, users.username FROM users WHERE id = $1',
      [id],
    );

    return user.rows[0];
  }
  async getAllById(id: string): Promise<UsersDB> {
    const user = await databasePool.query<UsersDB>(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    return user.rows[0];
  }
  async getByUsername(username: string): Promise<UsersDB> {
    const user = await databasePool.query<UsersDB>(
      'SELECT users.id, users.firstName, users.secondName, users.username FROM users WHERE username = $1',
      [username],
    );

    return user.rows[0];
  }
  async post(
    firstName: string,
    secondName: string,
    username: string,
    password: string,
    email: string,
  ) {
    const user = await databasePool.query<UsersDB>(
      'INSERT INTO users (firstName, secondName, username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, secondName, username, password, email],
    );

    return user.rows[0];
  }
  async editName(
    firstName: string,
    secondName: string,
    id: number,
  ): Promise<UsersDB> {
    const user = await databasePool.query<UsersDB>(
      'UPDATE users SET firstName = $1, secondName = $2 WHERE id = $3 RETURNING *',
      [firstName, secondName, id],
    );

    return user.rows[0];
  }
  async editEmail(email: string, id: number): Promise<UsersDB> {
    const user = await databasePool.query<UsersDB>(
      'UPDATE users SET email = $1 WHERE id = $2 RETURNING *',
      [email, id],
    );

    return user.rows[0];
  }
}

const usersAPI = new UsersAPI();

export default usersAPI;
