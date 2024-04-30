import { Router } from 'express';
import { membersController } from '../controllers';

const router = Router();

// GET METHODS
router.get('/members/:chatId', membersController.getByChatId);
router.get('/members/:userId/:chatId', membersController.getByChatIdAndUserId);
// POST METHODS
router.post('/members', membersController.post);
// DELETE METHODS
router.delete('/members/:id', membersController.delete);
router.delete(
  '/members/deleteByChatId/:chatId',
  membersController.deleteByChatId,
);
// PUT METHODS

export default router;
