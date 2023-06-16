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
exports.getById = exports.getWithDiscount = exports.getNew = exports.getRecommended = exports.getAll = void 0;
const sequelize_1 = require("sequelize");
const Phone_1 = require("../models/Phone");
const Product_1 = require("../models/Product");
function getAll({ offset, limit, productCategory }) {
    return __awaiter(this, void 0, void 0, function* () {
        const where = {};
        if (productCategory) {
            where.category = productCategory;
        }
        const { rows: rawProducts, count: totalCount } = yield Product_1.Product.findAndCountAll({
            where,
            offset,
            limit,
        });
        const products = rawProducts.map(({ dataValues }) => (Object.assign({}, dataValues)));
        return {
            rows: products,
            count: totalCount,
        };
    });
}
exports.getAll = getAll;
function getRecommended(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const rawProducts = yield Product_1.Product.findAll({
            where: {
                id: {
                    [sequelize_1.Op.ne]: id,
                },
            },
            order: sequelize_1.Sequelize.literal('random()'),
            limit: 8,
        });
        const products = rawProducts.map(({ dataValues }) => (Object.assign({}, dataValues)));
        return {
            rows: products,
            count: products.length,
        };
    });
}
exports.getRecommended = getRecommended;
function getNew() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawProducts = yield Product_1.Product.findAll({
            order: [['year', 'DESC']],
            limit: 8,
        });
        const products = rawProducts.map(({ dataValues }) => (Object.assign({}, dataValues)));
        return {
            rows: products,
            count: products.length,
        };
    });
}
exports.getNew = getNew;
function getWithDiscount() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawProducts = yield Product_1.Product.findAll({
            order: [['price', 'ASC']],
            limit: 8,
        });
        const products = rawProducts.map(({ dataValues }) => (Object.assign({}, dataValues)));
        return {
            rows: products,
            count: products.length,
        };
    });
}
exports.getWithDiscount = getWithDiscount;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield Product_1.Product.findByPk(id, {
            include: [{ model: Phone_1.Phone }],
        });
        return result;
    });
}
exports.getById = getById;
