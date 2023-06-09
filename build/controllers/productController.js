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
exports.getProductById = exports.getProductsWithDiscount = exports.getNewProducts = exports.getRecommendedProducts = exports.getAllProducts = void 0;
const categories_constants_1 = require("../constants/categories.constants");
const sortby_constants_1 = require("../constants/sortby.constants");
const productService_1 = require("../servises/productService");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const productCategory = req.query.category;
    const sortBy = req.query.sortBy;
    const search = req.query.search;
    if (productCategory && !categories_constants_1.VALID_CATEGORIES.includes(productCategory)) {
        return res
            .status(400)
            .send(`The category must be one of the types: ${categories_constants_1.VALID_CATEGORIES.join(', ')}`);
    }
    if (sortBy && !sortby_constants_1.VALID_SORTBY.includes(sortBy)) {
        return res
            .status(400)
            .send(`The filter must be one of the types: ${sortby_constants_1.VALID_SORTBY.join(', ')}`);
    }
    const offset = (page - 1) * limit;
    try {
        const { rows: products, count } = yield (0, productService_1.getAll)({
            offset,
            limit,
            productCategory,
            sortBy,
            search,
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
            totalCount: count,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllProducts = getAllProducts;
const getRecommendedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield (0, productService_1.getById)(productId);
        if (!product) {
            return res.sendStatus(404);
        }
        const { rows: products } = yield (0, productService_1.getRecommended)(productId);
        return res.json({
            products,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getRecommendedProducts = getRecommendedProducts;
const getNewProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: products } = yield (0, productService_1.getNew)();
        return res.json({
            products,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getNewProducts = getNewProducts;
const getProductsWithDiscount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { rows: products } = yield (0, productService_1.getWithDiscount)();
        return res.json({
            products,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getProductsWithDiscount = getProductsWithDiscount;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        const product = yield (0, productService_1.getById)(productId);
        if (!product) {
            return res.sendStatus(404);
        }
        return res.send(product);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving product:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getProductById = getProductById;
