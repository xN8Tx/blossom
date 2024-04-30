import { Router } from 'express';

import checkId from '../middleware/checkId';
import tokenVerify from '../middleware/tokenVerify';
import wsKeyController from '../controllers/wsKeyController';

const router = Router();

router.get('/:id', tokenVerify, checkId, wsKeyController.get);

export default router;
