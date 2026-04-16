import { model, Schema } from 'mongoose';
import { CATEGORIES } from '../constants/category.js';

const reviewSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    testimonial: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    avatar: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false },
);

const descriptionSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: false, versionKey: false },
);

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    suppliers: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
    },
    stock: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
      trim: true,
    },
    reviews: {
      type: [reviewSchema],
      default: [],
      select: false,
    },
    description: {
      type: [descriptionSchema],
      default: [],
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model('Product', productsSchema);
