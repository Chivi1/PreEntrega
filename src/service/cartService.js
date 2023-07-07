import CartManager from '../dao/Mongo/Managers/CartManager.js';

const cartManager = new CartManager();

class CartService {
  // Crear un nuevo carrito
  async createCart(products) {
    return await cartManager.createCart(products);
  }

  // Obtener un carrito por ID
  async getCartById(cartId) {
    return await cartManager.getCartById(cartId);
  }

  // Agregar un producto a un carrito
  async addProductToCart(cartId, productId, quantity) {
    return await cartManager.addProductToCart(cartId, productId, quantity);
  }

  // Eliminar todos los productos de un carrito
  async deleteAllProducts(cartId) {
    return await cartManager.deleteAllProducts(cartId);
  }

  // Actualizar un carrito
  async updateCart(cartId, updatedData) {
    return await cartManager.updateCart(cartId, updatedData);
  }

  // Eliminar un carrito
  async deleteCart(cartId) {
    await cartManager.deleteCart(cartId);
  }

  // Eliminar un producto de un carrito
  async removeProductFromCart(cartId, productId) {
    return await cartManager.removeProductFromCart(cartId, productId);
  }

  // Actualizar la cantidad de un producto en un carrito
  async updateProductQuantity(cartId, productId, quantity) {
    return await cartManager.updateProductQuantity(cartId, productId, quantity);
  }
}

export default CartService;
