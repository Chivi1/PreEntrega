import ProductRepository from '../service/repositories/productRepository.js';
import ProductDTO from '../dtos/productDto.js';

const productRepository = new ProductRepository();

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
    const result = await productRepository.getProducts(filter, options);

    return { productsData: result, cartId };
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { title, description, category, price, thumbnail, stock } = req.body;

    if (!title || !description || !category || !price || !thumbnail || !stock) {
      return res.status(400).send({ status: "error", error: "incomplete values" });
    }

    const productDTO = new ProductDTO(title, description, category, price, thumbnail, stock);
    const product = productDTO.toObject();

    await productRepository.createProduct(product);

    res.status(201).send('Creado');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProductById(req, res) {
  try {
    const { cid } = req.params;
    const product = await productRepository.getProductById(cid);

    if (!product) {
      return res.status(404).send({ status: "error", error: "product not found" });
    }

    res.send({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { cid } = req.params;
    const updateProduct = req.body;
    await productRepository.updateProduct(cid, updateProduct);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { cid } = req.params;
    await productRepository.deleteProduct(cid);
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
