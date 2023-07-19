import { getProducts } from "./productController.js"; 
import UserDTO from '../dtos/userDto.js';
import CartRepository from "../service/repositories/cartRepository.js";
import TicketModel from "../dao/Mongo/Models/TicketModel.js"

const viewsController = {};

viewsController.home = async (req, res) => {
  res.render('home');
};

viewsController.register = (req, res) => {
  res.render('register');
};

viewsController.login = (req, res) => {
  res.render('login');
};

viewsController.profile = (req, res) => {
  const userDTO = new UserDTO(req.session.user);
  res.render('profile', {
    user: userDTO
  });
};

viewsController.logout = (req, res) => {
  const cookieName = req.session.cookie.name;
  req.session.destroy(function(err) {
    if (err) {
      console.log('Error al cerrar sesión:', err);
    }
    res.clearCookie(cookieName);
    res.redirect('/login');
  });
};

viewsController.renderProducts = async (req, res, next) => {
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
};

viewsController.renderCarts = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartRepository = new CartRepository(); 
    const cart = await cartRepository.getCartById(cartId); 
    res.render('carts', { products: cart.products, cartId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

viewsController.renderTicket = async (req, res) => {
  try {
    const { cartId } = req.params;

    const ticket = await TicketModel.findOne({ cartId });

    res.render('ticket', { ticket });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener el ticket' });
  }
};


export default viewsController;
