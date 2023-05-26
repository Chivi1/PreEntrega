import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = 'products';

const schema = new mongoose.Schema({
    title:String, 
    description:String, 
    category:String,
    price:Number, 
    thumbnail:String,  
    stock:Number
})

schema.plugin(mongoosePaginate);

const productModel = mongoose.model(collection,schema);

export default productModel;