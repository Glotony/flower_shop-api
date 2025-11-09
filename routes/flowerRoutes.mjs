import express from 'express';
import auth from '../middleware/auth.mjs';
import admin from '../middleware/admin.mjs';
import { getAll,getOne,create,update,del } from '../controllers/flowerController.mjs';
const router = express.Router();

router.get('/', getAll);
router.get('/:id', getOne);

router.post('/', auth, admin, create);
router.patch('/:id', auth, admin, update);
router.delete('/:id', auth, admin, del);

export default router;
