import { Router } from 'express';
import { getStores } from '../controllers/storesController.js';

const router = Router();

router.get('/api/stores', getStores);

export default router;
