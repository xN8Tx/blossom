import { Router } from 'express';
import controller from '../controller/controller';
import tokenVerify from '../middleware/tokenVerify';

const router = Router();

router.get('/:fileId', tokenVerify, controller.get);
router.delete('/:fileId', controller.delete);
router.post('/', controller.post);

export default router;
