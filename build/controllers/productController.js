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
exports.getAllProducts = void 0;
const productModel_1 = require("../servises/productModel");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    if (limit < 0) {
        return res.status(400).send('Limit should be min 1');
    }
    const offset = (page - 1) * limit;
    try {
        const { rows: products, count } = yield (0, productModel_1.getAll)({ offset, limit });
        const totalPages = Math.ceil(count / limit);
        if (page <= 0 || page > totalPages) {
            return res
                .status(400)
                .send(`The page index should be between min: 1 and max: ${totalPages}`);
        }
        return res.json({
            products,
            page,
            totalPages,
        });
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error retrieving products:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllProducts = getAllProducts;
