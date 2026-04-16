import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  checkoutCart,
  deleteProduct,
  getCart,
  updateCart,
} from '../controllers/cartController.js';
import {
  checkoutCartSchema,
  updateCartSchema,
} from '../validations/cartValidation.js';
import { productsIdSchema } from '../validations/productsValidation.js';

const router = new Router();

router.get('/api/cart', authenticate, getCart);

router.put(
  '/api/cart/update',
  authenticate,
  celebrate(updateCartSchema),
  updateCart,
);

router.delete(
  '/api/cart/remove/:productId',
  authenticate,
  celebrate(productsIdSchema),
  deleteProduct,
);

router.post(
  '/api/cart/checkout',
  authenticate,
  celebrate(checkoutCartSchema),
  checkoutCart,
);

export default router;
