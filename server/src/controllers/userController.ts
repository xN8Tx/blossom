import usersAPI from '../api/usersAPI';
import checkId from '../utils/checkId';

import type { Request, Response } from 'express';

class UserController {
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await usersAPI.getById(id);

      res.status(200).json({ message: user });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  async getAllById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!checkId(id, req)) {
        res.status(500).json({ message: 'Invalid request' });
      }

      const user = await usersAPI.getAllById(id);

      res.status(200).json({ message: user });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  async getByUsername(req: Request, res: Response) {
    try {
      const { username } = req.params;

      const users = await usersAPI.getByUsername(username);

      res.status(200).json({ message: users });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
  async edit(req: Request, res: Response) {
    try {
      const { firstName, lastName, username, id } = req.body;

      // CHECK
      if (!checkId(id, req)) {
        res.status(500).json({ message: 'Invalid request' });
      }

      const user = await usersAPI.edit(firstName, lastName, username, id);
      res.status(200).json({ message: user });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}

const userController = new UserController();

export default userController;
