import ProductManager from '../dao/Mongo/Managers/ProductManager.js';
/* import productModel from "../dao/Mongo/Models/ProductModel.js" */

const productService = new ProductManager();

class ProductService {
  async getProducts(filter, options) {
    const products = await productService.paginate(filter, options);
    /* const products = await productModel.paginate(filter, options); */
    return products;
  }

  async createProduct(product) {
    return await productService.createProduct(product);
  }

  async getProductById(cid) {
    return await productService.getProductById(cid);
  }

  async updateProduct(cid, updatedData) {
    return await productService.updateProduct(cid, updatedData);
  }

  async deleteProduct(cid) {
    await productService.deleteProduct(cid);
  }
}

export default ProductService;
