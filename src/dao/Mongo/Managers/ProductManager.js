import productModel from "../Models/ProductModel.js";

class ProductManager {
  getProducts() {
    return productModel.find();
  }

  getProductBy(params) {
    return productModel.findOne(params);
  }

  createProduct(product) {
    return productModel.create(product);
  }

  updateProduct(id, product) {
    return productModel.findByIdAndUpdate(id, product);
  }

  deleteProduct(id) {
    return productModel.findByIdAndDelete(id);
  }
}

export default ProductManager;
