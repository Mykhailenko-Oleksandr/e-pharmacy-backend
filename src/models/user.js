import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 7,
    },
    avatar: {
      type: String,
    },
    // cart: [
    //   {
    //     productId: {
    //       type: Schema.Types.ObjectId,
    //       ref: 'Product',
    //       required: true,
    //     },
    //     quantity: { type: Number, default: 1 },
    //   },
    // ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
