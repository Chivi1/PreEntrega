import { Router } from 'express';
import {privacy} from '../middlewares/auth.js'
import {
  createCart,
  getCartById,
  addProductToCart,
  deleteAllProducts,
  updateCart,
  deleteCart,
  removeProductFromCart,
  updateProductQuantity,
  purchaseCart
} from '../controllers/cartController.js';
import viewsController from '../controllers/viewController.js';

const router = Router();

router.post('/', createCart);
router.get('/:cartId', privacy('PRIVATE'), viewsController.renderCarts);
router.post('/products', privacy("USER"), addProductToCart);
router.delete('/:cartId/products', deleteAllProducts);
router.put('/:cartId', updateCart);
router.delete('/:cartId', deleteCart);
router.delete('/:cartId/products/:productId', removeProductFromCart);
router.put('/:cartId', updateCart);
router.put('/:cartId/products/:productId', updateProductQuantity);

router.post('/:cid/purchase', purchaseCart);

export default router;
