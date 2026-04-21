import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const updateCartSchema = {
  [Segments.BODY]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
    quantity: Joi.number(),
  }).required(),
};

export const checkoutCartSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\+?[0-9]{7,15}$/)
      .required(),
    address: Joi.string().required(),
    payment: Joi.string().valid('cash', 'bank').required(),
  }).required(),
};
