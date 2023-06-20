import express from 'express';

import { getAllOrders, postOrder } from '../controllers/ordersController';

const ordersRouter = express.Router();

ordersRouter.get('/:userId', getAllOrders);
ordersRouter.post('/', postOrder);

export default ordersRouter;
