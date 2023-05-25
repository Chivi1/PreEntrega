import { Router } from "express";
import ProductManager from "../dao/Mongo/Managers/ProductManager.js";

const router = Router();
const productService = new ProductManager();

router.get('/',async(req,res)=>{
    const products = await productService.getProducts();
    res.render('products',{products});
})

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
    res.sendStatus();
})

router.get('/pid',async(req,res)=>{
    const {cid} = req.params;
    const product = await productService.getProductBy({_id: cid});
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