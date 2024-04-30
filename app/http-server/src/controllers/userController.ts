import CustomFetch from '../services/fetch/customFetch.api';
import logger from '../logger';

import type { Request, Response } from 'express';
import type { UserProfileDB, MessagesDB, UsersDB } from '../typings/database';

type UserWithMessages = UserProfileDB & {
  messages: MessagesDB[];
};

const databaseFetch = new CustomFetch('database');
const fileFetch = new CustomFetch('file');

class UserController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await databaseFetch.get(`/users/${id}`);

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error(
        'Error in UserController in getById',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async getAllById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await databaseFetch.get(`/users/full/${id}`);

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error(
        'Error in UserController in getresponseAllById',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async getByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const users = await databaseFetch.get(`/users/username/${username}`);

      res.status(200).json({ message: users });
    } catch (error) {
      logger.error(
        'Error in UserController in getByUsername',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async edit(req: Request, res: Response) {
    try {
      const { firstName, lastName, username, id } = req.body;

      const user = await databaseFetch.put(`/users`, {
        firstName,
        lastName,
        username,
        id,
      });
      res.status(200).json({ message: user });
    } catch (error) {
      logger.error(
        'Error in UserController in edit',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async getByIdWithMessages(req: Request, res: Response) {
    try {
      const { id, secondUserId } = req.params; // id - it's user id | secondUserId - it's profile id which we want to get

      const user = await databaseFetch.get(`/users/${secondUserId}`);
      const messages = await databaseFetch.get(
        `/messages/userId/${id}/${secondUserId}`,
      );

      (user as UserWithMessages).messages = messages as MessagesDB[];

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error(
        'Error in UserController in getByIdWithMessages',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async setAvatar(req: Request, res: Response) {
    try {
      const { id, file, fileName, fileType, fileExtension } = req.body;

      const currentProfile = await databaseFetch.get<UsersDB>(`/users/${id}`);

      if (!currentProfile) {
        logger.error(
          'Error in UserController in setAvatar',
          `currentProfile === null`,
        );
        return res.status(400).json({ message: 'Invalid access' });
      }

      if (currentProfile.avatar) {
        const currentAvatar = currentProfile.avatar;

        await fileFetch.delete(`/${currentAvatar}`);
      }

      const newAvatar = await fileFetch.post('/', {
        file,
        fileType,
        fileExtension,
        fileName,
      });

      const user = await databaseFetch.put('/users/avatar', { newAvatar, id });

      if (!user) {
        logger.error('Error in UserController in setAvatar', `user === null`);
        return res.status(400).json({ message: 'Invalid access' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error(
        'Error in UserController in setAvatar',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

const userController = new UserController();

export default userController;
