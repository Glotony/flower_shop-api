import express from 'express';
import { checkout } from '../controllers/cartController.mjs';
import { authMiddleware } from '../middlewares/auth.mjs';

const router = express.Router();

// All routes require auth
router.use(authMiddleware);

// POST /api/orders → checkout
router.post('/', checkout);

// You can also add future order endpoints here
// router.get('/', getOrders);
// router.get('/:id', getOrderById);

export default router;
