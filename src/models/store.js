import { model, Schema } from 'mongoose';

const storesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// storesSchema.index(
//   { title: 'text', content: 'text' },
//   {
//     name: 'NoteTextIndex',
//     weights: { title: 10, content: 5 },
//     default_language: 'english',
//   },
// );

export const Store = model('Store', storesSchema);
