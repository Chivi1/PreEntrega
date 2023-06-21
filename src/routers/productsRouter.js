import { Router } from "express";
import ProductManager from "../dao/Mongo/Managers/ProductManager.js";

import productModel from "../dao/Mongo/Models/ProductModel.js";

const router = Router();
const productService = new ProductManager();

/* router.get('/', async (req, res) => {
    const {page = 1, sort, category }= req.query;

    const filter = {};
    if (category) {
        filter.category = category;
    }

    const options = {
        page: parseInt(req.query.page) || 1,
        limit: 5,
        lean: true,
        sort: { price: sort === 'asc' ? 1 : -1 }
    };

    console.log('Categoría seleccionada:', req.category);
    
    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productModel.paginate(filter, options);

    const products = docs;
    res.status(200).send(products)
}); */

router.get ('/products', async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const { limit = 10 } = req. query;
        const { category } = req.query;
        /* const { sort } = req.query;

        let ordenar = '' 

        if (sort == 1 || sort == -1 || sort == 'asc' || sort == 'desc') {
        ordenar = {price: sort}
    } */

        const { docs, hasPrevPage, hasNextPage, prevage, nextPage, totalPages, ...rest } = await productModel.paginate({},
        {
            page, limit, lean: true, category/*, sort: ordenar */
        });

        const products = docs;

        res.render ('products', {
        products,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page: rest.page,
        limit: rest.limit,
        });

    } catch (error) {
        res.status(500).send({ status: "error", message: "error al obtener productos"});
    }
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