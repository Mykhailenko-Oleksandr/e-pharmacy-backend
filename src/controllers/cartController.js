import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Cart } from '../models/cart.js';
import { Product } from '../models/product.js';
import { Order } from '../models/order.js';

export const getCart = async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ userId }).populate('items.productId');

  if (!cart) {
    return res.status(200).json({ items: [] });
  }

  res.status(200).json(cart.items);
};

export const updateCart = async (req, res) => {
  const userId = req.user?._id;
  const { productId, quantity } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  if (quantity > product.stock) {
    throw createHttpError(
      409,
      `Requested quantity (${quantity}) exceeds available stock (${product.stock})`,
    );
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (quantity) {
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  if (!quantity) {
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity =
        cart.items[itemIndex].quantity + 1 <= product.stock
          ? cart.items[itemIndex].quantity + 1
          : cart.items[itemIndex].quantity;
    }
  }

  await cart.save();

  res.status(200).json(cart.items);
};

export const deleteProduct = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw createHttpError(404, 'Cart not found');
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId,
  );

  if (itemIndex === -1) {
    throw createHttpError(409, 'Product not found in cart');
  }

  cart.items.splice(itemIndex, 1);

  await cart.save();

  res.status(200).json(cart.items);
};

export const checkoutCart = async (req, res) => {
  const userId = req.user?._id;
  const { name, email, address, phone } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const cart = await Cart.findOne({ userId }).populate('items.productId');

  if (!cart || cart.items.length === 0) {
    throw createHttpError(409, 'Cart is empty');
  }

  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.productId.price * item.quantity;
  }, 0);

  const order = await Order.create({
    name,
    email,
    address,
    phone,
    products: cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    })),
    price: Number(totalPrice.toFixed(2)),
  });

  cart.items = [];
  await cart.save();

  res.status(200).json(order);
};
