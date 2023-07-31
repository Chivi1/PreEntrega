import CartManager from '../../dao/Mongo/Managers/CartManager.js';
import productModel from '../../dao/Mongo/Models/ProductModel.js';

class CartRepository {
  constructor() {
    this.cartManager = new CartManager();
  }

  async createCart(products) {
    try {
      const cartId = await this.cartManager.createCart(products);
      return cartId;
    } catch (error) {
      throw new Error('No se pudo crear el carrito.');
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await this.cartManager.getCartById(cartId);
      return cart;
    } catch (error) {
      throw new Error('No se pudo obtener el carrito.');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await this.cartManager.addProductToCart(cartId, productId, quantity);
      return cart;
    } catch (error) {
      throw new Error('No se pudo agregar el producto al carrito.');
    }
  }

  async checkProductExists(productId) {
    try {
      const product = await productModel.findById(productId);
      return !!product; 
    } catch (error) {
      return false;
    }
  }

  async updateCart(cartId, updatedData) {
    try {
      const cart = await this.cartManager.updateCart(cartId, updatedData);
      return cart;
    } catch (error) {
      throw new Error('No se pudo actualizar el carrito.');
    }
  }

  async deleteCart(cartId) {
    try {
      const result = await this.cartManager.deleteCart(cartId);
      return result;
    } catch (error) {
      throw new Error('No se pudo eliminar el carrito.');
    }
  }

  async deleteAllProducts(cartId) {
    try {
      const cart = await this.cartManager.deleteAllProducts(cartId);
      return cart;
    } catch (error) {
      throw new Error('No se pudieron eliminar los productos del carrito.');
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await this.cartManager.removeProductFromCart(cartId, productId);
      return cart;
    } catch (error) {
      throw new Error('No se pudo eliminar el producto del carrito.');
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await this.cartManager.updateProductQuantity(cartId, productId, quantity);
      return cart;
    } catch (error) {
      throw new Error('No se pudo actualizar la cantidad del producto en el carrito.');
    }
  }
}

export default CartRepository;
