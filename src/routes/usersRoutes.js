import { Router } from 'express';
import { getCurrentUser } from '../controllers/usersController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = new Router();

router.get('/api/users/me', authenticate, getCurrentUser);

export default router;
