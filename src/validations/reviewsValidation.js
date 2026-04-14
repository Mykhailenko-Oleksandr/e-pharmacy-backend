import { Joi, Segments } from 'celebrate';

export const getReviewsValidation = {
  [Segments.PARAMS]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).max(9).default(3),
  }),
};
