import { Router } from 'express';
import { chatController } from '../controllers';

const router = Router();

// GET METHODS
router.get('/chats/:id', chatController.getByUserId);
// POST METHODS
router.post('/chats', chatController.post);
// DELETE METHODS
router.delete('/chats/:id', chatController.deleteById);
// PUT METHODS

export default router;
