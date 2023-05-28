import { Router } from "express";
import ProductManager from "../dao/Mongo/Managers/ProductManager.js";
import productModel from "../dao/Mongo/Models/ProductModel.js";
import CartManager from "../dao/Mongo/Managers/CartManager.js";

const router = Router();
const productService = new ProductManager();
const CartService = new CartManager();

router.get('/', async (req, res) => {
    const { page = 1, sort, category } = req.query;
  
    let createCartResult = await CartService.createCart();
    let cartId = createCartResult.cartId;
    console.log("Carrito creado:", cartId);
    
    
  
    const filter = {};
    if (category) {
      filter.category = category;
    }
  
    const options = {
      page,
      limit: 4,
      lean: true,
      sort: { price: sort === 'asc' ? 1 : -1 } 
    };
  
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productModel.paginate(filter, options);
    const products = docs;
    console.log(products);
    res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage, page: rest.page, cartId });
  });
  
  


router.post('/', async(req,res)=>{
    const {title, description, category, price, thumbnail, stock} = req.body;
    if(!title ||!description ||!category ||!price ||!thumbnail ||!stock) 
    return res.status(400).send({status:"error", error:"incomplete values"})
    const product = {
        title,
        description, 
        category, 
        price, 
        thumbnail, 
        stock
    }
    const result = await productService.createProduct(product);
    res.status(200).send('Creado');
})

router.get('/pid',async(req,res)=>{
    const {cid} = req.params;
    const product = await productService.getProductBy({_id: cid}).lean();
    if (!product) 
        return res.status(404).send({status:"error",error:"product not found"});
    res.send({status: "success", payload: product});
})

router.put('/cid', async(req,res)=>{
    const {cid} = req.params;
    const updateProduct = req.body;
    await productService.updateProduct(cid,updateProduct);
    res.sendStatus(201);
})

router.delete('/cid', async(req,res)=>{
    const {cid} = req.params;
    await productService.deleteProduct(cid);
    res.sendStatus(201);
})

export default router;