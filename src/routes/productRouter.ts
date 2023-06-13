import express from 'express';
import {
  getAllProducts,
  getProductById,
} from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);
productRouter.get('/:productId', getProductById);

export default productRouter;
