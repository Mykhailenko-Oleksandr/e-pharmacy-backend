import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getStores } from '../controllers/storesController.js';
import { getStoresValidation } from '../validations/storesValidation.js';

const router = Router();

router.get('/api/stores', celebrate(getStoresValidation), getStores);

export default router;
