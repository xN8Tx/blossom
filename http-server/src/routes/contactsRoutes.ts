import { Router } from 'express';

import tokenVerify from '../middleware/tokenVerify';
import checkId from '../middleware/checkId';
import contactsController from '../controllers/contactsController';

const router = Router();

router.get('/:id', tokenVerify, checkId, contactsController.get);
router.post('/:id', tokenVerify, checkId, contactsController.post);
router.delete('/:id/:contactId', tokenVerify, checkId, contactsController.del);

export default router;
