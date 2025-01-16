"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const chatsDetSchema = new mongoose_1.default.Schema({
    chats_id: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: 'chats' },
    message: { type: String, required: true },
    user_id: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
});
const Chats_Det = mongoose_1.default.model('chats_dets', chatsDetSchema);
exports.default = Chats_Det;
//# sourceMappingURL=chats-det.js.map