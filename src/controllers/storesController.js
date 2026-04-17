import { Store } from '../models/store.js';

export const getStores = async (req, res) => {
  const { page = 1, perPage = 12 } = req.query;

  const storesQuery = Store.find();

  const skip = (page - 1) * perPage;

  const [totalStores, stores] = await Promise.all([
    storesQuery.clone().countDocuments(),
    storesQuery.skip(skip).limit(perPage).sort({ rating: -1, _id: 1 }),
  ]);

  const totalPages = Math.ceil(totalStores / perPage);

  res.status(200).json({
    page,
    perPage,
    totalStores,
    totalPages,
    stores,
  });
};
