import { Router } from 'express';
import { privacy } from '../middlewares/auth.js';

import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProducts
} from '../controllers/productController.js';



const router = Router();

router.get('/', getProducts);
router.post('/', privacy("ADMIN"), createProduct);
router.get('/:cid', getProductById);
router.put('/:cid', privacy("ADMIN"), updateProduct);
router.delete('/:cid', privacy("ADMIN"), deleteProduct);

export default router;
