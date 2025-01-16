"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controller/auth/auth");
const router = (0, express_1.Router)();
router.post('/login', auth_1.login);
router.get('/logout', auth_1.logout);
router.get('/verify', auth_1.verifyToken);
router.post('/signup', auth_1.signup);
exports.default = router;
//# sourceMappingURL=auth.js.map