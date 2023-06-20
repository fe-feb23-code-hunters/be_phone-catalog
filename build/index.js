"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbInit_1 = __importDefault(require("./utils/dbInit"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const ordersRouter_1 = __importDefault(require("./routes/ordersRouter"));
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
(0, dbInit_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/products', productRouter_1.default);
app.use('/auth', authRouter_1.default);
app.use('/orders', ordersRouter_1.default);
app.get('/', (_req, res) => {
    res.send('Hello World, from express');
});
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running in port ${PORT}`);
});
