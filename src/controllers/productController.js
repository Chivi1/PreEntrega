import ProductManager from '../dao/Mongo/Managers/ProductManager.js';
import ProductService from '../service/productsService.js';

const productManager = new ProductManager();
const productService = new ProductService();

async function getProducts(req, res) {
  try {
    const cartId = '64a6d42e855a8673d1c4418e';
    const { page = 1, sort, category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }

    const options = {
      page: parseInt(page),
      limit: 4,
      sort: { price: sort === 'asc' ? 1 : -1 }
    };
    const result = await productService.getProducts(filter, options);

    return { productsData: result, cartId };
    
  } catch (error) {
    throw error;
  }
}



// Crear un nuevo producto
async function createProduct(req, res) {
  try {
    const { title, description, category, price, thumbnail, stock } = req.body;

    if (!title || !description || !category || !price || !thumbnail || !stock) {
      return res.status(400).send({ status: "error", error: "incomplete values" });
    }

    const product = {
      title,
      description,
      category,
      price,
      thumbnail,
      stock
    };

    await productManager.createProduct(product);

    res.status(201).send('Creado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un producto por ID
async function getProductById(req, res) {
  try {
    const { cid } = req.params;
    const product = await productManager.getProductById(cid);

    if (!product) {
      return res.status(404).send({ status: "error", error: "product not found" });
    }

    res.send({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un producto
async function updateProduct(req, res) {
  try {
    const { cid } = req.params;
    const updateProduct = req.body;
    await productManager.updateProduct(cid, updateProduct);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  try {
    const { cid } = req.params;
    await productManager.deleteProduct(cid);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};
