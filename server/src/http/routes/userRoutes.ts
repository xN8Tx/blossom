import { Router } from 'express';

import tokenVerify from '../middleware/tokenVerify';
import checkId from '../middleware/checkId';
import userController from '../controllers/userController';
import checkIdByBody from '../middleware/checkIdByBody';

const router = Router();

router.get('/:id', tokenVerify, userController.getById);
router.get('/all/:id', tokenVerify, checkId, userController.getAllById);
router.get('/user/:username', tokenVerify, userController.getByUsername);
router.get(
  '/profile/:id/:secondUserId',
  tokenVerify,
  userController.getByIdWithMessages,
);
router.put('/:id', tokenVerify, checkId, userController.edit);
router.post('/avatar', tokenVerify, checkIdByBody, userController.setAvatar);

export default router;
