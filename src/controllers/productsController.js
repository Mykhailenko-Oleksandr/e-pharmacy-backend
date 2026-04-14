import { Product } from '../models/product.js';

export const getProducts = async (req, res) => {
  const { page = 1, perPage = 12, search, category } = req.query;

  const productsQuery = Product.find();

  const skip = (page - 1) * perPage;

  if (search) {
    productsQuery.where({ name: { $regex: search, $options: 'i' } });
  }

  if (category) {
    productsQuery.where('category').equals(category);
  }

  const [totalProducts, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(perPage).select('-reviews -description'),
  ]);

  const totalPages = Math.ceil(totalProducts / perPage);

  res.status(200).json({ page, perPage, totalProducts, totalPages, products });
};
