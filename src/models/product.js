import { model, Schema } from 'mongoose';
import { CATEGORIES } from '../constants/category.js';

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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Product = model('Product', productsSchema);
