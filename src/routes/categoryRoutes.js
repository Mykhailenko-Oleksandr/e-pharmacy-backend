import { Router } from 'express';
import { getAllCategories } from '../controllers/categoryController.js';

const router = Router();

router.get('/api/category', getAllCategories);

export default router;
