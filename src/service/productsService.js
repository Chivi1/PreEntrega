import productModel from '../dao/Mongo/Models/ProductModel.js';

class ProductService {
  async getProducts(filter, options) {
    const result = await productModel.paginate(filter, options);
    const products = result.docs.map(doc => doc.toObject({ getters: false }));
    result.docs = products;
    return result;
  }


  async createProduct(product) {
    return await productModel.create(product);
  }

  async getProductById(cid) {
    return await productModel.findById(cid);
  }

  async updateProduct(cid, updatedData) {
    return await productModel.findByIdAndUpdate(cid, updatedData);
  }

  async deleteProduct(cid) {
    await productModel.findByIdAndDelete(cid);
  }
}

export default ProductService;

