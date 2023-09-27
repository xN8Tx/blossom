import { Router } from 'express';

import authController from '../controllers/authController';

const router = Router();

router.post('/registration', authController.registration);
router.post('/registration-code', authController.registrationCode);
router.post('/login', authController.login);
router.post('/login-code', authController.loginCode);
router.get('/refresh', authController.refresh);
router.delete('/logout', authController.logout);

export default router;
