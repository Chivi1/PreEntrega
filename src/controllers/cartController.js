import CartRepository from '../service/repositories/cartRepository.js';
import cartModel from '../dao/Mongo/Models/CartModel.js';
import productModel from '../dao/Mongo/Models/ProductModel.js';

import UserDTO from '../dtos/userDto.js';
import Ticket from '../dao/Mongo/Models/TicketModel.js'

const cartRepository = new CartRepository();

// Crear un nuevo carrito
async function createCart(req, res) {
  try {
    const { products } = req.body;
    const cartId = await cartRepository.createCart({ products });
    res.status(201).json({ cartId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Obtener un carrito por ID
async function getCartById(req, res) {
  try {
    const { cartId } = req.params;
    const cart = await cartRepository.getCartById(cartId);
    /* return {products: cart.products} ; */
    res.status(200).send(cart)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agregar un producto a un carrito 
async function addProductToCart(req, res) {
  try {
    const { cartId, productId, quantity } = req.body;

    // Verificar si el producto existe antes de agregarlo al carrito
    const productExists = await cartRepository.checkProductExists(productId);
    if (!productExists) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const updatedCart = await cartRepository.addProductToCart(cartId, productId, quantity);
    
    if (!updatedCart) {
      return res.status(500).json({ error: 'No se pudo agregar el producto al carrito.' });
    }

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
      let productId, quantityInCart;

      
      if (item.product && item.product._id) {
        productId = item.product._id;
        quantityInCart = item.quantity;
      } else {
        productId = item._id;
        quantityInCart = 1; 
      }
      
      console.log(productId, quantityInCart)
      const product = await productModel.findById(productId);

      if (!product) {
        throw new Error(`Producto no encontrado: ${productId}`);
      }

      if (product.stock >= quantityInCart) {
        product.stock -= quantityInCart;
        await product.save();
        productsToUpdate.push(product);
      } else {
        failedProducts.push(product);
      }
    }

    const exampleUser = new UserDTO({ id: "64afe89d3ec913899377d55f", firstName: "Prueba", lastName: "preuba", role: "user", email: "prueba@correo.com" });
    const currentUser = req.session.user ? new UserDTO(req.session.user) : exampleUser;

    const totalAmount = cart.products.reduce((acc, item) => {
      const product = item.product || item; 
      const productPrice = product.price || 0;
      const quantity = item.quantity || 1; 
      return acc + productPrice * quantity;
    }, 0);

    const ticket = new Ticket({
      code: generateUniqueCode(),
      amount: totalAmount,
      purchaser: currentUser.id,
    });

    await ticket.save();

    const failedProductIds = failedProducts.map(product => product._id.toString());
    const remainingProducts = cart.products.filter(item => {
      const product = item.product || item; // Fallback for older cart structure
      return failedProductIds.includes(product._id.toString());
    });

    await cartModel.findByIdAndUpdate(cartId, { products: remainingProducts });

    // Verificar si el carrito está vacío y eliminarlo
    if (remainingProducts.length === 0) {
      await cartModel.findByIdAndDelete(cartId);
    }

    res.status(200).json({
      message: 'Compra finalizada con éxito',
      ticket,
      purchaser: ticket.purchaser,
      failedProducts: failedProducts.map(product => {
        return {
          productId: product._id,
          productName: product.title,
          requestedQuantity: cart.products.find(item => {
            const productInCart = item.product || item; // Fallback for older cart structure
            return productInCart._id.toString() === product._id.toString();
          }).quantity || 1, // Fallback for older cart structure
        };
      }),
    });
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


