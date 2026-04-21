import { model, Schema } from 'mongoose';
import { STATUSES } from '../constants/status.js';

const orderSchema = new Schema(
  {
    photo: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    payment: {
      type: String,
      enum: ['cash', 'bank'],
    },
    status: {
      type: String,
      enum: [...STATUSES],
      default: 'Pending',
    },
    order_date: { type: Date, default: Date.now },
  },
  { timestamps: false, versionKey: false },
);

export const Order = model('Order', orderSchema);
