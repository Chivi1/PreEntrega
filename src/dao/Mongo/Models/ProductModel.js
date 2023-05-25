import mongoose, { Schema } from "mongoose";

const collection = 'products';

const schema = new mongoose.Schema({
    title:String, 
    description:String, 
    category:String,
    price:Number, 
    thumbnail:String,  
    stock:Number
})

const productModel = mongoose.model(collection,schema);

export default productModel;