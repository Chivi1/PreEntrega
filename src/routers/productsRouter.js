import { Router } from "express";
import ProductManager from "../dao/Mongo/Managers/ProductManager.js";

import getProducts from "../service/productsService.js";

const router = Router();
const productService = new ProductManager();

router.get('/', async (req, res) => {
    const sort = req.query.sort;

    const options = {
        page: parseInt(req.query.page) || 1,
        limit: 5,
        lean: true,
        sort: { price: sort === 'asc' ? 1 : -1 }
    };

    console.log('Categoría seleccionada:', req.category);
    
    const { products, hasPrevPage, hasNextPage, prevPage, nextPage, cartId } = await getProducts(req.category, options)
    console.log('hasNextPage', hasNextPage)
    res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage, current: options.page, cartId });
});


router.post('/', async (req, res) => {
    const { title, description, category, price, thumbnail, stock } = req.body;
    if (!title || !description || !category || !price || !thumbnail || !stock)
        return res.status(400).send({ status: "error", error: "incomplete values" })
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

router.get('/pid', async (req, res) => {
    const { cid } = req.params;
    const product = await productService.getProductBy({ _id: cid }).lean();
    if (!product)
        return res.status(404).send({ status: "error", error: "product not found" });
    res.send({ status: "success", payload: product });
})

router.put('/cid', async (req, res) => {
    const { cid } = req.params;
    const updateProduct = req.body;
    await productService.updateProduct(cid, updateProduct);
    res.sendStatus(201);
})

router.delete('/cid', async (req, res) => {
    const { cid } = req.params;
    await productService.deleteProduct(cid);
    res.sendStatus(201);
})

export default router;