import { getProducts } from "./productController.js";

export async function renderProducts(req, res, next) {
    try {
      const { productsData, cartId } = await getProducts(req, res);
  
      const responseData = {
        products: productsData.docs,
        hasNextPage: productsData.hasNextPage,
        hasPrevPage: productsData.hasPrevPage,
        nextPage: productsData.nextPage,
        prevPage: productsData.prevPage,
        page: productsData.page,
        cartId: cartId
      };
  
      res.render('products', responseData);
    } catch (error) {
      next(error);
    }
  }
  