import { Joi, Segments } from 'celebrate';

export const registerSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\+?[0-9]{7,15}$/)
      .required(),
    password: Joi.string().min(7).required(),
  }).required(),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).required(),
};
