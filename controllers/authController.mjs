// authController.mjs
import { User } from '../models/index.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });

  } catch (err) {
    res.status(400).json({ message: 'Email already exists' });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET ME
export const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role']
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
// Checkout / place order
export const checkout = async (req, res) => {
  const items = carts[req.user.id];
  if (!items || items.length === 0) return res.status(400).json({ message: 'Cart empty' });

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const order = await Order.create({ userId: req.user.id, total });

  for (const item of items) {
    await OrderItem.create({ OrderId: order.id, FlowerId: item.flowerId, quantity: item.quantity });
  }

  carts[req.user.id] = []; // clear cart
  res.json({ message: 'Order placed', orderId: order.id });
};
