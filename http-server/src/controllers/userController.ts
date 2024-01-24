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
      const { id, file, fileName, fileType, fileExtension } = req.body;

      const currentProfile = await usersAPI.getById(id);

      if (!currentProfile) {
        errorLogManager.addToLogs(
          'Error in UserController in setAvatar',
          `currentProfile === null`,
        );
        return res.status(400).json({ message: 'Invalid access' });
      }
      if (currentProfile.avatar) {
        const avatar = currentProfile.avatar;

        const response = await fetch(
          `${process.env.FILE_SERVER_URL}/${avatar}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          errorLogManager.addToLogs(
            'Error in UserController in setAvatar',
            `avatar.response.status !== 200`,
          );
          return res.status(400).json({ message: 'Server error' });
        }
      }

      const response = await fetch(`${process.env.FILE_SERVER_URL}/`, {
        method: 'POST',
        body: JSON.stringify({
          file,
          fileType,
          fileExtension,
          fileName,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        errorLogManager.addToLogs(
          'Error in UserController in setAvatar',
          `response.status !== 200`,
        );
        return res.status(400).json({ message: 'Server error' });
      }

      const data = await response.json();
      const avatar = data.message;

      const user = await usersAPI.setAvatar(avatar, id);

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
