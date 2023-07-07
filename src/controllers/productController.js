import ProductManager from '../dao/Mongo/Managers/ProductManager.js';

const productService = new ProductManager();

async function getProducts(req, res) {
  try {
    const cartId = '64a6d42e855a8673d1c4418e';
    const { page = 1, sort, category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }

    const options = {
      page,
      limit: 4,
      lean: true,
      sort: { price: sort === 'asc' ? 1 : -1 }
    };

    const products = await productService.getProducts(filter,options).lean();
    

    const responseData = {
      products: products,
      hasNextPage: products.hasNextPage,
      hasPrevPage: products.hasPrevPage,
      nextPage: products.nextPage,
      prevPage: products.prevPage,
      page: products.page,
      cartId: cartId,
      filter,
      options
    };

    res.render('products', responseData);
    /* res.status(500).json(responseData) */
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    await productService.createProduct(product);

    res.status(201).send('Creado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtener un producto por ID
async function getProductById(req, res) {
  try {
    const { cid } = req.params;
    const product = await productService.getProductById(cid);

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
    await productService.updateProduct(cid, updateProduct);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  try {
    const { cid } = req.params;
    await productService.deleteProduct(cid);
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
