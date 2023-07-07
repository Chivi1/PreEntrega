import { Router } from 'express';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:cid', getProductById);
router.put('/:cid', updateProduct);
router.delete('/:cid', deleteProduct);

export default router;
