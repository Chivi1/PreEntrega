import { Router } from 'express';
import {
  createCart,
  getCartById,
  addProductToCart,
  deleteAllProducts,
  updateCart,
  deleteCart,
  removeProductFromCart,
  updateProductQuantity
} from '../controllers/cartController.js';

const router = Router();

router.post('/', createCart);
router.get('/:cartId', getCartById);
router.post('/products', addProductToCart);
router.delete('/:cartId/products', deleteAllProducts);
router.put('/:cartId', updateCart);
router.delete('/:cartId', deleteCart);
router.delete('/:cartId/products/:productId', removeProductFromCart);
router.put('/:cartId', updateCart);
router.put('/:cartId/products/:productId', updateProductQuantity);

export default router;
