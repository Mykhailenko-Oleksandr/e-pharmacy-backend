import { Router } from 'express';
import { celebrate } from 'celebrate';
import { getReviews } from '../controllers/reviewsController.js';
import { getReviewsValidation } from '../validations/reviewsValidation.js';

const router = Router();

router.get('/api/reviews', celebrate(getReviewsValidation), getReviews);

export default router;
