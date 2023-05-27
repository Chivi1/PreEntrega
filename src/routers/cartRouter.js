import { Router } from 'express';
import CartManager from '../dao/Mongo/Managers/CartManager.js';

const router = Router();
const cartManager = new CartManager();

// Endpoint para crear un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const { products } = req.body;
    const newCart = await cartManager.createCart(products);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un carrito por ID
router.get('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await cartManager.getCartById(cartId);
    res.render('cart', { cart }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para agregar un producto a un carrito
router.post('/products', async (req, res) => {
  try {
    const { cartId, productId, quantity } = req.body;
    
    let updatedCart;
    
    if (!cartId) {
      // Si no hay un carrito, crear un nuevo carrito
      const newCart = await cartManager.createCart([{ product: productId, quantity }]);
      updatedCart = newCart;
    } else {
      // Si se proporciona un ID de carrito, agregar productos al carrito existente
      updatedCart = await cartManager.addProductToCart(cartId, productId, quantity);
    }
    
    res.redirect(`/carts/${updatedCart._id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Endpoint para eliminar todos los productos de un carrito
router.delete('/:cartId/products', async (req, res) => {
  try {
    const { cartId } = req.params;
    const updatedCart = await cartManager.deleteAllProducts(cartId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para actualizar un carrito
router.put('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    const updatedData = req.body;
    const updatedCart = await cartManager.updateCart(cartId, updatedData);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para eliminar un carrito
router.delete('/:cartId', async (req, res) => {
  try {
    const { cartId } = req.params;
    await cartManager.deleteCart(cartId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/carts/:cartId/products/:productId', async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const updatedCart = await cartManager.removeProductFromCart(cartId, productId);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  router.put('/carts/:cartId', async (req, res) => {
    try {
      const { cartId } = req.params;
      const { products } = req.body;
      const updatedCart = await cartManager.updateCart(cartId, { products });
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/carts/:cartId/products/:productId', async (req, res) => {
    try {
      const { cartId, productId } = req.params;
      const { quantity } = req.body;
      const updatedCart = await cartManager.updateProductQuantity(cartId, productId, quantity);
      res.json(updatedCart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
