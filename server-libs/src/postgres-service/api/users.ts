import { errorLogManager } from '../../logs-manager';
import databasePool from '../connector/connector';

import type { UserProfileDB, UsersDB } from '../typings/typings';

type UserWithoutPassword = Omit<UsersDB, 'password'>;

class UsersAPI {
  async getById(id: string): Promise<UserProfileDB | null> {
    try {
      const user = await databasePool.query<UserProfileDB>(
        'SELECT users.id, users."firstName", users."lastName", users.username, users.avatar FROM users WHERE id = $1',
        [id],
      );

      return user.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI getById',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getAllById(id: string): Promise<UserWithoutPassword | null> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'SELECT id, "firstName", "lastName", username, email, status, avatar FROM users WHERE id = $1',
        [id],
      );

      return user.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI getAllById',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getByUsername(username: string): Promise<UserProfileDB[] | null> {
    try {
      const user = await databasePool.query<UserProfileDB>(
        'SELECT id, "firstName", "lastName", username, avatar, status FROM users WHERE LOWER(username) LIKE $1',
        [`%${username.toLowerCase()}%`],
      );

      return user.rows;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI getByUsername',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async post(
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    email: string,
  ): Promise<UserWithoutPassword | null> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'INSERT INTO users ("firstName", "lastName", username, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING id, "firstName", "lastName", username, email, avatar, status',
        [firstName, lastName, username, password, email],
      );

      return user.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI post',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async edit(
    firstName: string,
    lastName: string,
    username: string,
    id: number,
  ): Promise<UserWithoutPassword | null> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'UPDATE users SET "firstName" = $1, "lastName" = $2, username = $3 WHERE id = $4 RETURNING id, "firstName", "lastName", username, email, avatar, status',
        [firstName, lastName, username, id],
      );

      return user.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI edit',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async editEmail(
    email: string,
    id: number,
  ): Promise<UserWithoutPassword | null> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'UPDATE users SET email = $1 WHERE id = $2 RETURNING id, "firstName", "lastName", username, email, avatar, status',
        [email, id],
      );

      return user.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI editEmail',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async getAllByEmail(email: string): Promise<UsersDB[] | null> {
    try {
      const users = await databasePool.query<UsersDB>(
        'SELECT * FROM users WHERE email = $1',
        [email],
      );

      return users.rows;
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI getAllByEmail',
        (error as Error)?.message,
      );
      return null;
    }
  }
  async setAvatar(
    avatar: string,
    id: string,
  ): Promise<UserWithoutPassword | null> {
    try {
      const user = await databasePool.query<UserWithoutPassword>(
        'UPDATE users SET "avatar" = $1 WHERE id = $2 RETURNING id, "firstName", "lastName", username, email, avatar, status',
        [avatar, id],
      );

      return user.rows[0];
    } catch (error) {
      errorLogManager.addToLogs(
        '⚠️ Error in UsersAPI setAvatar',
        (error as Error)?.message,
      );
      return null;
    }
  }
}

const usersAPI = new UsersAPI();

export default usersAPI;
