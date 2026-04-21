import { CATEGORIES } from '../constants/category.js';

export const getAllCategories = async (req, res) => {
  res.status(200).json(CATEGORIES);
};
