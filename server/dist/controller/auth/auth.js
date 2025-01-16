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
exports.signup = exports.verifyToken = exports.logout = exports.login = void 0;
const users_1 = __importDefault(require("../../schema/users/users"));
const jwt_1 = require("../../helper/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield users_1.default.findOne({ email, password });
        if (!user) {
            res.status(400).json({ mssge: 'Email or Password incorrect, try again.' });
            return;
        }
        const { _id } = user;
        const token = yield (0, jwt_1.createJWT)(_id, email, password);
        res.cookie("token", token, {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
            path: '/'
        }).json({ user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mssge: 'Fatal crash, Please contact the supplier.' });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('token').status(200).json({ mssge: 'Sucessfully logged out' });
    }
    catch (error) {
        res.status(500).json({ mssge: error });
    }
});
exports.logout = logout;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.clearCookie('token');
            res.status(400).json({ mssge: 'Invalid or expired token' });
            return;
        }
        try {
            const { _id } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            if (_id) {
                const user = yield users_1.default.findById({ _id });
                if (!user) {
                    res.clearCookie('token');
                    res.status(400).json({ mssge: 'Unauthorized' });
                    return;
                }
                res.json({ user });
                return;
            }
        }
        catch (error) {
            res.clearCookie('token');
            res.status(400).send('Invalid token!');
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.clearCookie('token');
        res.status(400).json({ mssge: 'Token unauthorized' });
        return;
    }
});
exports.verifyToken = verifyToken;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastname, email, password } = req.body;
        const userExist = yield users_1.default.findOne({ where: { email } });
        if (userExist) {
            res.status(500).json({ mssge: 'Email currently registered, please use another one.' });
            return;
        }
        const post = new users_1.default({ name, lastname, email, password });
        yield post.save();
        res.json({ message: 'ok' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ mssge: 'Error with the register process' });
        return;
    }
});
exports.signup = signup;
//# sourceMappingURL=auth.js.map