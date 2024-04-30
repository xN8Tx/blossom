import { Router } from 'express';
import { wsKeyController } from '../controllers';

const router = Router();

// GET METHODS
router.post('/ws-key/check', wsKeyController.check);
// POST METHODS
router.post('/ws-key', wsKeyController.create);

export default router;
