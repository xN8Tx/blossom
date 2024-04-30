import { Router } from 'express';
import { chatController, contactsController } from '../controllers';

const router = Router();

// GET METHODS
router.get('/contacts/:id', contactsController.get);
router.get('/contacts/:userId/:contactId', contactsController.getById);
// POST METHODS
router.post('/contacts', contactsController.post);
// DELETE METHODS
router.delete('/contacts/:userId/:contactId', chatController.deleteById);

export default router;
