import ProductManager from '../../dao/Mongo/Managers/ProductManager.js';
import ProductModel from '../../dao/Mongo/Models/ProductModel.js';

class ProductRepository {
  constructor() {
    this.productManager = new ProductManager();
  }

  async getProducts(filter, options) {
    const result = await ProductModel.paginate(filter, options);
    const products = result.docs.map(doc => doc.toObject({ getters: false }));
    result.docs = products;
    return result;
  }

  async createProduct(product) {
    await this.productManager.createProduct(product);
  }

  async getProductById(productId) {
    return await this.productManager.getProductById(productId);
  }

  async updateProduct(productId, updateProduct) {
    await this.productManager.updateProduct(productId, updateProduct);
  }

  async deleteProduct(productId) {
    await this.productManager.deleteProduct(productId);
  }
}

export default ProductRepository;
