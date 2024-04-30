import { Request, Response } from 'express';
import logger from '../../logger';
import { codeAPI } from '../api';

class CodeController {
  async create(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const code = await codeAPI.create(email);
      if (!code) throw new Error('Can not create code!');

      res.status(200).json({ message: code });
    } catch (error) {
      logger.error(
        'Error in CodeController in create. ',
        JSON.stringify(error),
      );
      res.status(500).json({ message: 'Server error' });
    }
  }
  async check(req: Request, res: Response) {
    try {
      const { email, key } = req.body;

      const isCodeCorrect = await codeAPI.check(email, key);
      if (!isCodeCorrect) throw new Error('Code is wrong!');

      res.status(200).json({ message: isCodeCorrect });
    } catch (error) {
      logger.error('Error in CodeController in check. ', JSON.stringify(error));
      res.status(500).json({ message: 'Server error' });
    }
  }
}

const codeController = new CodeController();

export default codeController;
