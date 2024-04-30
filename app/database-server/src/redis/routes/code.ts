import { Router } from 'express';
import { codeController } from '../controllers';

const router = Router();

// GET METHODS
router.post('/code/check', codeController.check);
// POST METHODS
router.post('/code/create', codeController.create);

export default router;
