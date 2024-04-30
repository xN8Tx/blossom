import { Router } from 'express';
import controller from '../controller/controller';
import tokenVerify from '../middleware/tokenVerify';

const router = Router();

// GET METHODS
router.get('/:fileId', tokenVerify, controller.get);
// DELETE METHODS
router.delete('/:fileId', controller.delete);
// POST METHODS
router.post('/', controller.post);

export default router;
