import cartModel from "../Models/CartModel.js";

class CartManager {
  async createCart(products) {
    try {
      const cart = await cartModel.create({ products });
      return { cartId: cart._id };
    } catch (error) {
      throw new Error('No se pudo crear el carrito.');
    }
  }
  

  async getCartById(cartId) {
    try {
      const cart = await cartModel.findById(cartId).populate('products.product').lean();
      return cart;
    } catch (error) {
      throw new Error('No se pudo obtener el carrito.');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await cartModel.findByIdAndUpdate(
        cartId,
        { $push: { products: { product: productId, quantity: quantity } } },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error('No se pudo agregar el producto al carrito.');
    }
  }
  async updateCart(cartId, updatedData) {
    try {
      const cart = await cartModel.findByIdAndUpdate(
        cartId,
        updatedData,
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error('No se pudo actualizar el carrito.');
    }
  }

  async deleteCart(cartId) {
    try {
      await cartModel.findByIdAndDelete(cartId);
      return true;
    } catch (error) {
      throw new Error('No se pudo eliminar el carrito.');
    }
  }
    async deleteAllProducts(cartId) {
      try {
        const cart = await cartModel.findByIdAndUpdate(
          cartId,
          { $set: { products: [] } },
          { new: true }
        );
        return cart;
      } catch (error) {
        throw new Error('No se pudieron eliminar los productos del carrito.');
      }
    }

    async removeProductFromCart(cartId, productId) {
      try {
        const cart = await cartModel.findByIdAndUpdate(
          cartId,
          { $pull: { products: { product: productId } } },
          { new: true }
        );
        return cart;
      } catch (error) {
        throw new Error('No se pudo eliminar el producto del carrito.');
      }
    }
  
    async updateProductQuantity(cartId, productId, quantity) {
      try {
        const cart = await cartModel.findOneAndUpdate(
          { _id: cartId, 'products.product': productId },
          { $set: { 'products.$.quantity': quantity } },
          { new: true }
        );
        return cart;
      } catch (error) {
        throw new Error('No se pudo actualizar la cantidad del producto en el carrito.');
      }
    }
  }



export default CartManager;
