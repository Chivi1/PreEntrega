import productModel from "../Models/ProductModel.js";

export default class ProductManager {
getProducts = ()=>{
    return productModel.find().lean;
    }

getProductBy = (params)=>{
    return productModel.findOne(params).lean;
}

createProduct = (product)=>{
    return productModel.create(product);
}

updateProduct = (id,product)=>{
    return productModel.findByIdAndUpdate(id,{$set:product})
}
deleteProduct = (id)=>{
    return productModel.findByIdAndDelete(id);
}
}