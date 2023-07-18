import CartRepository from '../service/repositories/cartRepository.js';
import cartModel from '../dao/Mongo/Models/CartModel.js';
import productModel from '../dao/Mongo/Models/ProductModel.js';


import CartDTO from '../dtos/cartDto.js';
import UserDTO from '../dtos/userDto.js';
import Ticket from '../dao/Mongo/Models/TicketModel.js'

const cartRepository = new CartRepository();

// Crear un nuevo carrito
async function createCart(req, res) {
  try {
    const { products } = req.body;
    const cartDTO = new CartDTO(products);
    const newCart = await cartRepository.createCart(cartDTO.toObject());
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un carrito por ID
async function getCartById(req, res) {
  try {
    const { cartId } = req.params;
    const cart = await cartRepository.getCartById(cartId);
    return {products: cart.products} ;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agregar un producto a un carrito
async function addProductToCart(req, res) {
  try {
    const { cartId, productId, quantity } = req.body;
    const updatedCart = await cartRepository.addProductToCart(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar todos los productos de un carrito
async function deleteAllProducts(req, res) {
  try {
    const { cartId } = req.params;
    const updatedCart = await cartRepository.deleteAllProducts(cartId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un carrito
async function updateCart(req, res) {
  try {
    const { cartId } = req.params;
    const updatedData = req.body;
    const updatedCart = await cartRepository.updateCart(cartId, updatedData);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un carrito
async function deleteCart(req, res) {
  try {
    const { cartId } = req.params;
    await cartRepository.deleteCart(cartId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un producto de un carrito
async function removeProductFromCart(req, res) {
  try {
    const { cartId, productId } = req.params;
    const updatedCart = await cartRepository.removeProductFromCart(cartId, productId);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar la cantidad de un producto en un carrito
async function updateProductQuantity(req, res) {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    const updatedCart = await cartRepository.updateProductQuantity(cartId, productId, quantity);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


function generateUniqueCode() {
  const timestamp = Date.now().toString(); 
  const randomId = Math.random().toString(36).slice(2, 7); 

  const uniqueCode = `${timestamp}-${randomId}`;

  return uniqueCode;
}


async function purchaseCart(req, res) {
  try {
    const { cartId } = req.params;

    if (!cartId) {
      return res.status(400).json({ error: 'ID de carrito inválido' });
    }

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const productsToUpdate = [];
    const failedProducts = [];

    for (const item of cart.products) {
      const productId = item.product;
      const quantityInCart = item.quantity;

      const product = await productModel.findById(productId);

      if (!product) {
        throw new Error(`Producto no encontrado: ${productId}`);
      }

      if (product.stock >= quantityInCart) {
        product.stock -= quantityInCart;
        await product.save();
        productsToUpdate.push(product);
      } else {
        failedProducts.push(product._id);
      }
    }

    await cartModel.findByIdAndUpdate(cartId, { products: cart.products });

    const exampleUser = {id:"64afe89d3ec913899377d55f", name: "Prueba", role: "user", email: "prueba@correo.com"}

    const currentUser = req.session.user ? new UserDTO(req.session.user) : exampleUser;

    if (!currentUser) {
      return res.status(400).json({ error: 'Usuario no válido' });
    }

    const ticket = new Ticket({
      code: generateUniqueCode(),
      amount: cart.totalAmount,
      purchaser: currentUser.email, 
    });

    await ticket.save();

    const failedProductIds = failedProducts.map(product => product._id);
    const remainingProducts = cart.products.filter(item => failedProductIds.includes(item.product.toString()));
    cart.products = remainingProducts;
    await cart.save();

    return res.status(200).json({ message: 'Compra finalizada con éxito', ticket, failedProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al finalizar la compra' });
  }
}



export {
  createCart,
  getCartById,
  addProductToCart,
  deleteAllProducts,
  updateCart,
  deleteCart,
  removeProductFromCart,
  updateProductQuantity,
  purchaseCart, 
};


