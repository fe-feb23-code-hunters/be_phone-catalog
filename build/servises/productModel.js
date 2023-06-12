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
exports.getAll = void 0;
const Phone_1 = require("../models/Phone");
const Product_1 = require("../models/Product");
function getAll({ offset, limit }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows: rawProducts, count: totalCount } = yield Product_1.Product
            .findAndCountAll({
            include: [{ model: Phone_1.Phone }],
            offset,
            limit,
        });
        const products = rawProducts.map(({ dataValues }) => (Object.assign(Object.assign({}, dataValues), { phone: dataValues.phone.dataValues })));
        return {
            rows: products,
            count: totalCount,
        };
    });
}
exports.getAll = getAll;
