import imageAPI from '../services/images/images.api';
import { errorLogManager, messagesAPI, usersAPI } from 'database';

import type { Request, Response } from 'express';
import type { UserProfileDB, MessagesDB } from 'database';

type UserWithMessages = UserProfileDB & {
  messages: MessagesDB[];
};

class UserController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await usersAPI.getById(id);

      res.status(200).json({ message: user });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in UserController in getById',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async getAllById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await usersAPI.getAllById(id);

      res.status(200).json({ message: user });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in UserController in getAllById',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async getByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const users = await usersAPI.getByUsername(username);

      res.status(200).json({ message: users });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in UserController in getByUsername',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async edit(req: Request, res: Response) {
    try {
      const { firstName, lastName, username, id } = req.body;

      const user = await usersAPI.edit(firstName, lastName, username, id);
      res.status(200).json({ message: user });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in UserController in edit',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async getByIdWithMessages(req: Request, res: Response) {
    try {
      const { id, secondUserId } = req.params; // id - it's user id | secondUserId - it's profile id which we want to get

      const user = await usersAPI.getById(secondUserId);
      const messages = await messagesAPI.getByUserId(
        Number(id),
        Number(secondUserId),
      );

      (user as UserWithMessages).messages = messages as MessagesDB[];

      res.status(200).json({ message: user });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in UserController in getByIdWithMessages',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
  async setAvatar(req: Request, res: Response) {
    try {
      const { id, avatar } = req.body;

      const webpAvatar = await imageAPI.madeWebpFromBase64(avatar);
      if (typeof webpAvatar !== 'string')
        return res.status(400).json({ message: 'Invalid image' });

      const user = await usersAPI.setAvatar(webpAvatar, id);

      if (!user) {
        errorLogManager.addToLogs(
          'Error in UserController in setAvatar',
          `user === null`,
        );
        return res.status(400).json({ message: 'Invalid access' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      errorLogManager.addToLogs(
        'Error in UserController in setAvatar',
        `${(error as Error).message}`,
      );
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

const userController = new UserController();

export default userController;
