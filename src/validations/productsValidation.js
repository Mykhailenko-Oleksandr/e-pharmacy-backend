import { Joi, Segments } from 'celebrate';
import { CATEGORIES } from '../constants/category.js';

export const getProductsValidation = {
  [Segments.PARAMS]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(4).max(24).default(12),
    search: Joi.string().trim().allow(''),
    category: Joi.string().valid(...CATEGORIES),
  }),
};
