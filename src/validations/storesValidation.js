import { Joi, Segments } from 'celebrate';

export const getStoresValidation = {
  [Segments.PARAMS]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(4).max(24).default(12),
  }),
};
