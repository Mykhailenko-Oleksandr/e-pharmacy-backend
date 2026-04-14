import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getProductById,
  getProducts,
} from '../controllers/productsController.js';
import {
  getProductsValidation,
  productsIdSchema,
} from '../validations/productsValidation.js';

const router = Router();

router.get('/api/products', celebrate(getProductsValidation), getProducts);
router.get(
  '/api/products/:productId',
  celebrate(productsIdSchema),
  getProductById,
);

export default router;
