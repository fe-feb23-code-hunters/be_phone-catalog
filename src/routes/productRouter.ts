import express from 'express';
import { getAllProducts } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

export default productRouter;
