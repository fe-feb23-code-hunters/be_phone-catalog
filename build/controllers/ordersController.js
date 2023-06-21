"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postOrder = exports.getAllOrders = void 0;
const ordersService_1 = require("../servises/ordersService");
const authService_1 = require("../servises/authService");
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    if (!userId) {
        return res.status(400).send('The user id is invalid');
    }
    try {
        const user = yield (0, authService_1.getUserById)(userId);
        if (!user) {
            return res.status(400).send('There is no such user');
        }
        const orders = yield (0, ordersService_1.getUserOrders)(userId);
        return res.json({
            orders,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllOrders = getAllOrders;
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const products = req.body.products;
    if (!userId) {
        return res.status(400).send('The user id is invalid');
    }
    if (!products.length) {
        return res
            .status(400)
            .send('You should have at least 1 product to post an order');
    }
    try {
        const user = yield (0, authService_1.getUserById)(userId);
        if (!user) {
            return res.status(400).send('There is no such user');
        }
        const order = yield (0, ordersService_1.createOrder)(userId, products);
        if (!order) {
            return res.status(400).send('Not able to post an order');
        }
        return res.json({
            order,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.postOrder = postOrder;
