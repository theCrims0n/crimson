"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createJWT = (_id, email = '', password = '') => {
    return new Promise((resolve, reject) => {
        const payload = { _id, email, password };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, { expiresIn: '8h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Token failed');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.createJWT = createJWT;
const validateJWT = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.clearCookie('token');
        return res.status(401).json({ msg: 'Invalid or expired token' });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (error) {
        console.log(error);
        res.clearCookie('token');
        return res.status(401).json({ msg: 'Invalid or expired token' });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=jwt.js.map