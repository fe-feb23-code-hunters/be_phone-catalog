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
exports.getUserOrders = exports.createOrder = void 0;
const Order_1 = require("../models/Order");
const Product_1 = require("../models/Product");
const ProductOrder_1 = require("../models/ProductOrder");
const createOrder = (userId, products) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.Order.create({ userId });
    const productIds = products.map((product) => product.id);
    const foundProducts = yield Product_1.Product.findAll({
        where: {
            id: productIds,
        },
    });
    yield Promise.all(foundProducts.map((product) => __awaiter(void 0, void 0, void 0, function* () {
        const productOrder = yield ProductOrder_1.ProductOrder.create({
            productId: product.id,
            orderId: order.id,
            count: 0, // Default count to 0
        });
        const matchingProduct = products.find((p) => p.id === product.id);
        if (matchingProduct) {
            productOrder.count = matchingProduct.count;
            yield productOrder.save();
        }
    })));
    const fullOrder = yield Order_1.Order.findByPk(order.id, {
        include: [Product_1.Product],
    });
    return fullOrder;
});
exports.createOrder = createOrder;
const getUserOrders = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_1.Order.findAll({
        where: { userId },
        include: [Product_1.Product],
    });
    return orders;
});
exports.getUserOrders = getUserOrders;
