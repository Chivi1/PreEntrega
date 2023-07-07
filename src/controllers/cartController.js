import CartService from '../service/cartService.js';

const cartService = new CartService();

// Crear un nuevo carrito
async function createCart(req, res) {
  try {
    const { products } = req.body;
    const newCart = await cartService.createCart(products);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un carrito por ID
async function getCartById(req, res) {
  try {
    const { cartId } = req.params;
    const cart = await cartService.getCartById(cartId);
    res.render('carts', { products: cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agregar un producto a un carrito
async function addProductToCart(req, res) {
  try {
    const { cartId, productId, quantity } = req.body;
    const updatedCart = await cartService.addProductToCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar todos los productos de un carrito
async function deleteAllProducts(req, res) {
  try {
    const { cartId } = req.params;
    const updatedCart = await cartService.deleteAllProducts(cartId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un carrito
async function updateCart(req, res) {
  try {
    const { cartId } = req.params;
    const updatedData = req.body;
    const updatedCart = await cartService.updateCart(cartId, updatedData);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un carrito
async function deleteCart(req, res) {
  try {
    const { cartId } = req.params;
    await cartService.deleteCart(cartId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un producto de un carrito
async function removeProductFromCart(req, res) {
  try {
    const { cartId, productId } = req.params;
    const updatedCart = await cartService.removeProductFromCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar la cantidad de un producto en un carrito
async function updateProductQuantity(req, res) {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartService.updateProductQuantity(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  createCart,
  getCartById,
  addProductToCart,
  deleteAllProducts,
  updateCart,
  deleteCart,
  removeProductFromCart,
  updateProductQuantity
};
