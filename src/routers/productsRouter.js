import { Router } from 'express';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import viewController from '../controllers/viewController.js';

const router = Router();

router.get('/', viewController.renderProducts);
router.post('/', createProduct);
router.get('/:cid', getProductById);
router.put('/:cid', updateProduct);
router.delete('/:cid', deleteProduct);

export default router;
