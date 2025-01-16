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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets2 = void 0;
const users_1 = require("../controller/socket2/users");
const chat = new users_1.Chat2();
const Sockets2 = (socket, io) => {
    console.log('An user has connected');
    socket.on('register', (user) => {
        user.socket_id = socket.id;
        chat.addUsers(user).then((users) => {
            io.emit('register', users);
            console.log(users);
        });
    });
    socket.on('message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { chat_id: id, message, socket_to, user_id, user_to_id } = data;
        const chat_id = yield chat.saveMassages(id, message, user_id, user_to_id);
        io.emit('Typing', false);
        io.to(socket.id).to(id).emit('message', { message, user_id, chat_id });
    }));
    socket.on('setLastMessages', (socket_to) => {
        chat.setLastMessages(socket.id, socket_to).then((lastMessage) => __awaiter(void 0, void 0, void 0, function* () {
            const { messages, messagesTo } = lastMessage;
            io.to(socket.id).emit('setLastMessages', messages);
            io.to(socket_to).emit('setLastMessages', messagesTo);
        }));
    });
    socket.on('join-room', (room) => {
        socket.join(room);
    });
    socket.on('getAllMessages', (_a) => __awaiter(void 0, [_a], void 0, function* ({ chat_id }) {
        const messages = yield chat.getAllMessages(chat_id);
        io.to(socket.id).emit('getAllMessages', messages);
    }));
    socket.on('Typing', (data) => {
        const { to, typing, chat_id } = data;
        io.to(to).emit('Typing', { typing, chat_id });
    });
    socket.on('disconnect', () => {
        const users = chat.deleteUser(socket.id);
        io.emit('register', users);
        console.log(users);
    });
};
exports.Sockets2 = Sockets2;
//# sourceMappingURL=socket2.js.map