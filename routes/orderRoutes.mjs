import express from 'express';
import auth from '../middlewares/auth.mjs';
import { getOrders, getOrderById } from '../controllers/orderController.mjs';
const router = express.Router();

router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);

export default router;
