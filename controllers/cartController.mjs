import { Flower, Order, OrderItem } from '../models/index.mjs';

const carts = {};

export const getCart = (req, res) => res.json(carts[req.user.id] || []);

export const addToCart = async (req, res) => {
  const { flowerId, quantity = 1 } = req.body;
  const flower = await Flower.findByPk(flowerId);
  if (!flower) return res.status(404).json({ message: 'Flower not found' });

  if (!carts[req.user.id]) carts[req.user.id] = [];

  const existing = carts[req.user.id].find(i => i.flowerId === flowerId);
  if (existing) existing.quantity += quantity;
  else carts[req.user.id].push({ flowerId, name: flower.name, price: flower.price, quantity });

  res.json(carts[req.user.id]);
};

export const updateCartItem = (req, res) => {
  const { flowerId } = req.params;
  const { quantity } = req.body;

  const cart = carts[req.user.id];
  if (!cart) return res.status(404).json({ message: 'Cart empty' });

  const item = cart.find(i => i.flowerId == flowerId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });

  item.quantity = quantity;
  res.json(cart);
};

export const removeFromCart = (req, res) => {
  const { flowerId } = req.params;
  const cart = carts[req.user.id];
  if (!cart) return res.status(404).json({ message: 'Cart empty' });

  carts[req.user.id] = cart.filter(i => i.flowerId != flowerId);
  res.json(carts[req.user.id]);
};

export const clearCart = (req, res) => {
  carts[req.user.id] = [];
  res.json({ message: 'Cart cleared' });
};

export const checkout = async (req, res) => {
  const cart = carts[req.user.id];
  if (!cart || cart.length === 0) return res.status(400).json({ message: 'Cart empty' });

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = await Order.create({ userId: req.user.id, total });

  for (const item of cart) {
    await OrderItem.create({ OrderId: order.id, FlowerId: item.flowerId, quantity: item.quantity });
  }

  carts[req.user.id] = [];
  res.json({ message: 'Order placed', orderId: order.id });
};
