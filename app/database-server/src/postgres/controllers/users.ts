import { Request, Response } from 'express';
import logger from '../../logger';
import { usersAPI } from '../api';

class UsersController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await usersAPI.getById(Number(id));

      if (!user) {
        logger.error('Error in UsersController in getById. user === null');
        return res.status(400).json({ message: 'UsersController' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in getById.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getAllById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await usersAPI.getAllById(Number(id));

      if (!user) {
        logger.error('Error in UsersController in getAllById. user === null');
        return res.status(400).json({ message: 'User is null' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in getAllById.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const user = await usersAPI.getByUsername(username);

      if (!user) {
        logger.error(
          'Error in UsersController in getByUsername. user === null',
        );
        return res.status(400).json({ message: 'User is null' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in getByUsername.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async post(req: Request, res: Response) {
    try {
      const { firstName, lastName, username, password, email } = req.body;

      const user = await usersAPI.post(
        firstName,
        lastName,
        username,
        password,
        email,
      );

      if (!user) {
        logger.error('Error in UsersController in post. user === null');
        return res.status(400).json({ message: 'User is null' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in post.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async edit(req: Request, res: Response) {
    try {
      const { id, firstName, lastName, username } = req.body;

      const user = await usersAPI.edit(
        firstName,
        lastName,
        username,
        Number(id),
      );

      if (!user) {
        logger.error('Error in UsersController in edit. user === null');
        return res.status(400).json({ message: 'User is null' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in edit.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async editEmail(req: Request, res: Response) {
    try {
      const { id, email } = req.body;

      const user = await usersAPI.editEmail(email, Number(id));

      if (!user) {
        logger.error('Error in UsersController in editEmail. user === null');
        return res.status(400).json({ message: 'User is null' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in editEmail.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getAllByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const user = await usersAPI.getAllByEmail(email);

      console.log(user);

      if (!user) {
        logger.error(
          'Error in UsersController in getAllByEmail. user === null',
        );
        return res.status(400).json({ message: 'User is null' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in getAllByEmail.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async setAvatar(req: Request, res: Response) {
    try {
      const { avatar, id } = req.body;

      const user = await usersAPI.setAvatar(avatar, Number(id));

      if (!user) {
        logger.error('Error in UsersController in setAvatar. user === null');
        return res.status(400).json({ message: 'User is null' });
      }

      res.status(200).json({ message: user });
    } catch (error) {
      logger.error('Error in UsersController in setAvatar.', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

const usersController = new UsersController();

export default usersController;
