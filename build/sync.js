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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sync = void 0;
/* eslint-disable no-console */
const Phone_1 = require("./models/Phone");
const Product_1 = require("./models/Product");
const dbInit_1 = __importDefault(require("./utils/dbInit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const User_1 = require("./models/User");
const Order_1 = require("./models/Order");
const ProductOrder_1 = require("./models/ProductOrder");
const seedInitialPhones = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const phonesFolderPath = path_1.default.join(__dirname, '..', 'public', 'api', 'phones');
        const phoneFiles = fs_1.default.readdirSync(phonesFolderPath);
        const phoneDataArray = [];
        for (const phoneFile of phoneFiles) {
            const phoneFilePath = path_1.default.join(phonesFolderPath, phoneFile);
            const phoneFileContent = fs_1.default.readFileSync(phoneFilePath, 'utf-8');
            const phoneData = JSON.parse(phoneFileContent);
            phoneDataArray.push(phoneData);
        }
        yield Phone_1.Phone.bulkCreate(phoneDataArray);
    }
    catch (error) {
        console.log('Error seeding data:', error);
    }
});
const seedInitialProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsFilePath = path_1.default.join(__dirname, '..', 'public', 'api', 'products.json');
        const productsFileContent = fs_1.default.readFileSync(productsFilePath, 'utf-8');
        const productsData = JSON.parse(productsFileContent);
        console.log(productsData);
        yield Product_1.Product.bulkCreate(productsData);
    }
    catch (error) {
        console.log('Error seeding data:', error);
    }
});
const sync = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, dbInit_1.default)();
    yield Phone_1.Phone.sync({ alter: true });
    yield Product_1.Product.sync({ alter: true });
    yield User_1.User.sync({ alter: true, force: true });
    yield Order_1.Order.sync({ alter: true, force: true });
    yield ProductOrder_1.ProductOrder.sync({ alter: true, force: true });
    yield seedInitialPhones();
    yield seedInitialProducts();
});
exports.sync = sync;
