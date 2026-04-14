import { Review } from '../models/review.js';

export const getReviews = async (req, res) => {
  const { page = 1, perPage = 3 } = req.query;

  const reviewsQuery = Review.find();

  const skip = (page - 1) * perPage;

  const [totalReviews, reviews] = await Promise.all([
    reviewsQuery.clone().countDocuments(),
    reviewsQuery.skip(skip).limit(perPage).sort({ createdAt: -1 }),
  ]);

  const totalPages = Math.ceil(totalReviews / perPage);

  res.status(200).json({ page, perPage, totalReviews, totalPages, reviews });
};
