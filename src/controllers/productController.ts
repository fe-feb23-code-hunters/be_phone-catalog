import { VALID_CATEGORIES } from '../constants/categories.constants';
import { VALID_SORTBY } from '../constants/sortby.constants';
import {
  getAll,
  getRecommended,
  getWithDiscount,
  getById,
  getNew,
} from '../servises/productService';

export const getAllProducts = async(req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const productCategory = req.query.category;
  const sortBy = req.query.sortBy;

  if (productCategory && !VALID_CATEGORIES.includes(productCategory)) {
    return res
      .status(400)
      .send(
        `The category must be one of the types: ${VALID_CATEGORIES.join(', ')}`,
      );
  }

  if (sortBy && !VALID_SORTBY.includes(sortBy)) {
    return res
      .status(400)
      .send(`The filter must be one of the types: ${VALID_SORTBY.join(', ')}`);
  }

  const offset = (page - 1) * limit;

  try {
    const { rows: products, count } = await getAll({
      offset,
      limit,
      productCategory,
      sortBy,
    });

    const totalPages = Math.ceil(count / limit);

    if (page <= 0 || (page > totalPages && totalPages !== 0)) {
      return res
        .status(400)
        .send(`The page index should be between min: 1 and max: ${totalPages}`);
    }

    return res.json({
      products,
      page,
      totalPages,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving products:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRecommendedProducts = async(req, res) => {
  const { productId } = req.params;

  try {
    const product = await getById(productId);

    if (!product) {
      return res.sendStatus(404);
    }

    const { rows: products } = await getRecommended(productId);

    return res.json({
      products,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving products:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNewProducts = async(req, res) => {
  try {
    const { rows: products } = await getNew();

    return res.json({
      products,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving products:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductsWithDiscount = async(req, res) => {
  try {
    const { rows: products } = await getWithDiscount();

    return res.json({
      products,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving products:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProductById = async(req, res) => {
  const { productId } = req.params;

  try {
    const product = await getById(productId);

    if (!product) {
      return res.sendStatus(404);
    }

    return res.send(product);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error retrieving product:', error);

    return res.status(500).json({ error: 'Internal server error' });
  }
};
