import { Router } from 'express';

import tokenVerify from '../middleware/tokenVerify';
import userController from '../controllers/userController';

const router = Router();

router.get('/:id', tokenVerify, userController.getById);
router.get('/all/:id', tokenVerify, userController.getAllById);
router.get('/user/:username', tokenVerify, userController.getByUsername);
router.put('/', tokenVerify, userController.edit);

export default router;
