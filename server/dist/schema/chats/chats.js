"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatsSchema = new mongoose_1.default.Schema({
    user_to: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: 'users' },
    user_from: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now }
});
const Chats = mongoose_1.default.model('chats', chatsSchema);
exports.default = Chats;
//# sourceMappingURL=chats.js.map