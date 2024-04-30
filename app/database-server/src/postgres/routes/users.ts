import { Router } from 'express';
import { usersController } from '../controllers';

const router = Router();

// GET METHODS
router.get('/users/:id', usersController.getById);
router.get('/users/full/:id', usersController.getAllById);
router.get('/users/username/:username', usersController.getByUsername);
router.get('/users/email/:email', usersController.getAllByEmail);
// POST METHODS
router.post('/users', usersController.post);
// PUT METHODS
router.put('/users', usersController.edit);
router.put('/users/email', usersController.editEmail);
router.put('/users/avatar', usersController.setAvatar);

export default router;
