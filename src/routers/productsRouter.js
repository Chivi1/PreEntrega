import { Router } from 'express';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';
import { renderProducts } from '../controllers/viewController.js';

const router = Router();

router.get('/', renderProducts);
router.post('/', createProduct);
router.get('/:cid', getProductById);
router.put('/:cid', updateProduct);
router.delete('/:cid', deleteProduct);

export default router;
