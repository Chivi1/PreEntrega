import productModel from "../dao/Mongo/Models/ProductModel.js";
import CartManager from "../dao/Mongo/Managers/CartManager.js";
const CartServ = new CartManager();

async function getProducts(category, options) {

    let createCartResult = await CartServ.createCart();
    let cartId = createCartResult.cartId;
    console.log("Carrito creado:", cartId);

    const filter = {};
    if (category) {
        filter.category = category;
    }

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } = await productModel.paginate(filter, options);
    console.log(hasPrevPage, hasNextPage, nextPage)
    return { products: docs, hasNextPage, hasPrevPage, nextPage, prevPage, page: rest.page, cartId }
}

export default getProducts