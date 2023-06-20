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
exports.resetPassword = exports.logIn = exports.signUp = void 0;
const authService_1 = require("../servises/authService");
const bcryptjs_1 = require("bcryptjs");
const generatePassword_1 = require("../utils/generatePassword");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const email = (_a = req.body) === null || _a === void 0 ? void 0 : _a.email;
    const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    if (password.length <= 8) {
        return res
            .status(400)
            .send('The password length should be at least 8 symbols');
    }
    const checkedUser = yield (0, authService_1.getUserByEmail)(email);
    if (checkedUser) {
        return res.status(400).send('The user is already signed up');
    }
    try {
        const salt = yield (0, bcryptjs_1.genSalt)(10);
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, salt);
        const user = yield (0, authService_1.createUser)(email, hashedPassword);
        return res.status(201).send(user);
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});
exports.signUp = signUp;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const email = (_c = req.body) === null || _c === void 0 ? void 0 : _c.email;
    const password = (_d = req.body) === null || _d === void 0 ? void 0 : _d.password;
    if (!email || !password) {
        return res.sendStatus(400);
    }
    try {
        const checkedUser = yield (0, authService_1.getUserByEmail)(email);
        if (!checkedUser) {
            return res.status(404).send('There is no such user');
        }
        const isPasswordValid = yield (0, bcryptjs_1.compare)(password, checkedUser.password);
        if (!isPasswordValid) {
            return res.status(403).send('The password is wrong');
        }
        return res.status(200).send({ isLoggedIn: true });
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});
exports.logIn = logIn;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const email = (_e = req.body) === null || _e === void 0 ? void 0 : _e.email;
    if (!email) {
        return res.sendStatus(400);
    }
    const checkedUser = yield (0, authService_1.getUserByEmail)(email);
    if (!checkedUser) {
        return res.status(404).send('There is no such user');
    }
    const password = (0, generatePassword_1.generateRandomPassword)(8);
    try {
        const salt = yield (0, bcryptjs_1.genSalt)(10);
        const hashedPassword = yield (0, bcryptjs_1.hash)(password, salt);
        yield (0, authService_1.updateUser)(checkedUser.id, { password: hashedPassword });
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: 'nice.gadgets@shop.com',
            to: email,
            subject: '[Nice Gadgets] Reset password',
            text: `Your new password: ${password}`,
        };
        transporter.sendMail(mailOptions, () => {
            res.status(200).send('Password has been reseted. Check your email');
        });
    }
    catch (error) {
        res.status(500).send('Something went wrong');
    }
});
exports.resetPassword = resetPassword;
