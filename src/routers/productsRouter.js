import { Router } from 'express';
import { privacy } from '../middlewares/auth.js';

import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

import viewController from '../controllers/viewController.js';

const router = Router();

router.get('/', viewController.renderProducts);
router.post('/', privacy("ADMIN"), createProduct);
router.get('/:cid', getProductById);
router.put('/:cid', privacy("ADMIN"), updateProduct);
router.delete('/:cid', privacy("ADMIN"), deleteProduct);

export default router;
