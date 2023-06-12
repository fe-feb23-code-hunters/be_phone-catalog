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
const Phone_1 = require("./models/Phone");
const Product_1 = require("./models/Product");
const dbInit_1 = __importDefault(require("./utils/dbInit"));
const sync = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, dbInit_1.default)();
    yield Phone_1.Phone.sync({ alter: true });
    yield Product_1.Product.sync({ alter: true });
});
sync();
