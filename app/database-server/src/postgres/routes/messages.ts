import { Router } from 'express';
import { messagesController } from '../controllers';

const router = Router();

// GET METHODS
router.get('/messages/:id', messagesController.getById);
router.get('/messages/:chatId/:page', messagesController.getByChatId);
router.get(
  '/messages/userId/:userId/:contactId',
  messagesController.getByUserId,
);
// POST METHODS
router.post('/messages', messagesController.post);
router.post('/messages/file', messagesController.postFile);
// PUT METHODS
router.put('/messages', messagesController.edit);
router.put('/messages/status', messagesController.changeMessagesStatus);
// DELETE METHODS
router.delete('/messages/:id', messagesController.delete);
router.delete('/messages/chatId/:chatId', messagesController.deleteByChatId);

export default router;
