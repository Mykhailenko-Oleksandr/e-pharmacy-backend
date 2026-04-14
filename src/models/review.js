import { model, Schema } from 'mongoose';

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    testimonial: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Review = model('Review', reviewSchema);
