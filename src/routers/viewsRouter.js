import { Router } from 'express';
import { privacy } from '../middlewares/auth.js';
import viewsController from '../controllers/viewController.js'

const router = Router();

router.get('/', viewsController.home);

router.get('/register', privacy('NO_AUTHENTICATED'), viewsController.register);

router.get('/login', privacy('NO_AUTHENTICATED'), viewsController.login);

router.get('/profile', privacy('PRIVATE'), viewsController.profile);

router.post('/logout', privacy('PRIVATE'), viewsController.logout);

router.get('/products', viewsController.renderProducts);

router.get('/cart', viewsController.renderCarts);

export default router;
