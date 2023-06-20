"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authContoller_1 = require("../controllers/authContoller");
const authRouter = express_1.default.Router();
authRouter.post('/sign-up', authContoller_1.signUp);
authRouter.post('/log-in', authContoller_1.logIn);
authRouter.patch('/reset-password', authContoller_1.resetPassword);
exports.default = authRouter;
