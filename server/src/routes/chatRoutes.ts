import { Router } from 'express';

import chatController from '../controllers/chatsController';
import checkId from '../middleware/checkId';
import tokenVerify from '../middleware/tokenVerify';

const router = Router();

router.get('/:id', tokenVerify, checkId, chatController.get);

export default router;
