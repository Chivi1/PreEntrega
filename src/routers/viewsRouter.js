import { Router } from "express";

const router = Router();

router.get('/', async(req,res)=>{
    res.render('home')
})

router.get('/api/products', (req, res) => {
  const { products, hasNextPage, hasPrevPage, nextPage, prevPage, page, cartId } = req.body;
  
  // Lógica de renderizado de la vista utilizando los datos recibidos
  res.render('products', { products, hasNextPage, hasPrevPage, nextPage, prevPage, page, cartId });
});

router.get('/api/carts/:cartId', (req, res) => {
  const { cartId } = req.params;

  try {
    res.render('carts', { cartId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router