import { Request, Response } from 'express';
import logger from '../../logger';
import { membersAPI } from '../api';

class MembersController {
  async getByChatId(req: Request, res: Response) {
    try {
      const { chatId } = req.params;

      const members = await membersAPI.getByChatId(Number(chatId));

      if (!members) {
        logger.error(
          'Error in MembersController getByChatId. members === null',
        );
        return res.status(400).json({ message: 'Members is null' });
      }

      res.status(200).json({ message: members });
    } catch (error) {
      logger.error(
        'Error in MembersController getByChatId',
        JSON.stringify(error),
      );
    }
  }

  async getByChatIdAndUserId(req: Request, res: Response) {
    try {
      const { chatId, userId } = req.params;

      const members = await membersAPI.getByChatIdAndUserId(
        Number(chatId),
        Number(userId),
      );

      if (!members) {
        logger.error(
          'Error in MembersController getByChatIdAndUserId. members === null',
        );
        return res.status(400).json({ message: 'Members is null' });
      }

      res.status(200).json({ message: members });
    } catch (error) {
      logger.error(
        'Error in MembersController getByChatIdAndUserId',
        JSON.stringify(error),
      );
    }
  }

  async post(req: Request, res: Response) {
    try {
      const { chatId, userId } = req.body;

      const members = await membersAPI.post(Number(chatId), Number(userId));

      if (!members) {
        logger.error('Error in MembersController post. members === null');
        return res.status(400).json({ message: 'Members is null' });
      }

      res.status(200).json({ message: members });
    } catch (error) {
      logger.error('Error in MembersController post', JSON.stringify(error));
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const members = await membersAPI.delete(Number(id));

      if (!members) {
        logger.error('Error in MembersController delete. members === null');
        return res.status(400).json({ message: 'Members is null' });
      }

      res.status(200).json({ message: members });
    } catch (error) {
      logger.error('Error in MembersController delete', JSON.stringify(error));
    }
  }

  async deleteByChatId(req: Request, res: Response) {
    try {
      const { chatId } = req.params;

      const members = await membersAPI.deleteByChatId(Number(chatId));

      if (!members) {
        logger.error(
          'Error in MembersController deleteByChatId. members === null',
        );
        return res.status(400).json({ message: 'Members is null' });
      }

      res.status(200).json({ message: members });
    } catch (error) {
      logger.error(
        'Error in MembersController deleteByChatId',
        JSON.stringify(error),
      );
    }
  }
}

const membersController = new MembersController();

export default membersController;
