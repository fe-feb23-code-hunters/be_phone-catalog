import express from 'express';
import {
  getAllProducts,
  getProductById,
  getRecommendedProducts,
  getProductsWithDiscount,
  getNewProducts,
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:productId/recommended', getRecommendedProducts);
productRouter.get('/new', getNewProducts);
productRouter.get('/discount', getProductsWithDiscount);
productRouter.get('/:productId', getProductById);

export default productRouter;
