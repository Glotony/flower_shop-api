import express from 'express';
import auth from '../middlewares/auth.mjs';
import admin from '../middlewares/admin.mjs';
import { getAll, getOne, create, update, del } from '../controllers/flowerController.mjs';

const router = express.Router();

// Public routes
router.get('/', getAll);
router.get('/:id', getOne);

// Admin-protected routes
router.post('/', auth, admin, create);
router.patch('/:id', auth, admin, update);
router.delete('/:id', auth, admin, del);

export default router;
