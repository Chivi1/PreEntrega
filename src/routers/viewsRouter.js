import { Router } from "express";
import productModel from "../dao/Mongo/Models/ProductModel.js";

const router = Router();

router.get('/', async (req, res) => {
  res.render('home')
});

router.get('/cart', async (req, res) =>{
    const products = cart.products;
      console.log(products)
      res.render('carts', { products})
    });


    router.get('/products', async (req, res) => {
      try {
        const { page = 1, limit = 5, sort, category, ...queries } = req.query;
    
        let queryUrl = "";
        for (let key in queries) {
          queryUrl += `&${key}=${queries[key]}`
        }
    
        let sortedIsRequested = null;
        if (sort) {
          sortedIsRequested = { price: sort };
        }
    
        const filter = {};
        if (category) {
          filter.category = category;
        }
    
        const {
          docs,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage,
          ...rest
        } = await productModel.paginate(filter, {
          page,
          limit,
          sort: sortedIsRequested,
          lean: true
        });
    
        const products = docs;
    
        res.render('products', {
          products,
          queryUrl,
          page: rest.page,
          hasPrevPage,
          hasNextPage,
          prevPage,
          nextPage,
          limit
        });
    
        console.log(products, rest.totalDocs, rest.totalPages, page);
      } catch (error) {
        res.render('error');
      }
    });
    
    
export default router