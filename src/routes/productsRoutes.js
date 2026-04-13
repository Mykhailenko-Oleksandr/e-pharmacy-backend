import { Router } from 'express';
import { getProducts } from '../controllers/productsController.js';
import { celebrate } from 'celebrate';
import { getProductsValidation } from '../validations/productsValidation.js';

const router = Router();

router.get('/api/products', celebrate(getProductsValidation), getProducts);

export default router;
