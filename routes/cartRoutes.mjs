import express from 'express';
import auth from '../middlewares/auth.mjs';
import { getCart, addToCart, checkout } from '../controllers/cartController.mjs';

const router = express.Router();

// Get all cart items for the logged-in user
router.get('/', auth, getCart);

// Add an item to the cart
router.post('/', auth, addToCart);

// Checkout cart (create order)
router.post('/checkout', auth, checkout);

export default router;
