import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  checkout
} from '../controllers/cartController.mjs';
import authMiddleware from '../middlewares/auth.mjs';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/:flowerId', updateCartItem);
router.delete('/:flowerId', removeFromCart);
router.delete('/', clearCart);
router.post('/checkout', checkout);

export default router;
