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
const mongoose_1 = __importDefault(require("mongoose"));
const chats_1 = __importDefault(require("../../schema/chats/chats"));
const chats_det_1 = __importDefault(require("../../schema/chats/chats-det"));
const users_1 = __importDefault(require("../../schema/users/users"));
class Chat {
    constructor() {
        this.users = [];
        this.usersList = [];
    }
    addUsers(_id, email, name, lastname, socket_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = { _id, email, name, lastname, socket_id };
            this.users.push(user);
            this.usersList = yield this.getUsers();
            this.usersList = this.usersList.map(dataRow => {
                var _a;
                return {
                    _id: dataRow._id,
                    socket_id: ((_a = this.users.filter(f => f._id == dataRow._id)[0]) === null || _a === void 0 ? void 0 : _a.socket_id) || '',
                    name: dataRow.name,
                    lastname: dataRow.lastname,
                    email: dataRow.email
                };
            });
            return this.usersList;
        });
    }
    createChat(chat_id, message, socket_id, user_to) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const chats = chats_1.default;
            const chats_det = chats_det_1.default;
            let createmessage;
            const user_id = (_a = this.usersList.filter(f => f.socket_id == socket_id)[0]) === null || _a === void 0 ? void 0 : _a._id;
            if (chat_id.trim().length == 0) {
                const chat = yield chats.create({ user_from: user_id, user_to: user_to });
                if (chat) {
                    const { _id } = chat;
                    createmessage = yield chats_det.create({ chats_id: _id, message, user_id: user_id });
                }
            }
            else {
                createmessage = yield chats_det.create({ chats_id: chat_id, message, user_id: user_id });
            }
            if (createmessage) {
                const { chats_id } = createmessage;
                const messages = yield this.getAllMessages(chats_id);
                return { messages, chats_id };
            }
        });
    }
    setLastMessages(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const chats = chats_1.default;
            const chats_det = chats_det_1.default;
            const users = users_1.default;
            const user_id = (_a = this.users.filter(f => f.socket_id == _id)[0]) === null || _a === void 0 ? void 0 : _a._id;
            const messages = yield chats.aggregate([
                {
                    $match: {
                        $or: [{ user_from: new mongoose_1.default.Types.ObjectId(user_id === null || user_id === void 0 ? void 0 : user_id.toString()) },
                            { user_to: new mongoose_1.default.Types.ObjectId(user_id === null || user_id === void 0 ? void 0 : user_id.toString()) }]
                    }
                },
                {
                    $lookup: {
                        from: chats_det.collection.name,
                        localField: '_id',
                        foreignField: 'chats_id',
                        as: 'chats_dets'
                    }
                },
                {
                    $unwind: '$chats_dets'
                },
                {
                    $lookup: {
                        from: users.collection.name,
                        localField: 'user_to',
                        foreignField: '_id',
                        as: 'users'
                    }
                },
                {
                    $unwind: '$users'
                },
                {
                    $group: { _id: '$chats_dets.chats_id', lastDocument: { $last: "$$ROOT" } }
                },
            ]).then((result) => {
                return JSON.parse(JSON.stringify(result));
            });
            return messages;
        });
    }
    getAllMessages(chat_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = chats_1.default;
            const chats_det = chats_det_1.default;
            const messages = yield chats.aggregate([
                {
                    $match: { _id: new mongoose_1.default.Types.ObjectId(chat_id === null || chat_id === void 0 ? void 0 : chat_id.toString()) }
                },
                {
                    $lookup: {
                        from: chats_det.collection.name,
                        localField: '_id',
                        foreignField: 'chats_id',
                        as: 'chats_dets'
                    }
                },
                {
                    $unwind: '$chats_dets'
                },
                { $project: { message: '$chats_dets.message', _id: '$chats_dets._id', date: '$chats_dets.createdAt', user_id: '$chats_dets.user_id', chat_id: '$chats_dets.chats_id' } },
                { $sort: { _id: -1 } }
            ]).then((result) => {
                return JSON.parse(JSON.stringify(result));
            });
            return messages;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = users_1.default;
            return yield users.find();
        });
    }
    findUser(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.filter((user) => user._id == _id)[0];
            if (!user) {
                return [];
            }
            return user;
        });
    }
    deleteUser(id) {
        const deleteUser = this.findUser(id);
        this.users = this.users.filter(user => user.socket_id != id);
        const users = this.users;
        return { users, deleteUser };
    }
}
exports.default = Chat;
//# sourceMappingURL=users.js.map