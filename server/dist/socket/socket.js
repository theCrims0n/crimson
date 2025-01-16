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
exports.Sockets = void 0;
const users_1 = __importDefault(require("../controller/socket/users"));
const usersChat = new users_1.default();
const Sockets = (socket, io) => {
    console.log('An user has connected');
    socket.on('enterChat', (user) => {
        const { email, name, lastname, _id } = user;
        usersChat.addUsers(_id, email, name, lastname, socket.id).then((users) => {
            io.emit('enterChat', users);
            console.log(users);
        });
    });
    socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { chat_id, message, user_to, unreadMessages } = data;
        const result = yield usersChat.createChat(chat_id, message, socket.id, user_to);
        if (result) {
            const { messages, chats_id } = result;
            const user = yield usersChat.findUser(user_to);
            if (user) {
                const { socket_id } = user;
                io.to(socket_id).emit('isTyping', { typing: false, noticeChat_id: chat_id });
                io.to([socket_id, socket.id]).emit('sendMessage', { messages, chats_id, unreadMessages });
            }
        }
    }));
    socket.on('setLastMessages', () => {
        usersChat.setLastMessages(socket.id).then((lastMessage) => __awaiter(void 0, void 0, void 0, function* () {
            io.to(socket.id).emit('setLastMessages', lastMessage);
        }));
    });
    socket.on('unreadMessages', (data) => {
        const { socket_to, unreadMessages, chat_id } = data;
        unreadMessages.count++;
        unreadMessages.chat_id = chat_id;
        io.to(socket_to).emit('unreadMessages', unreadMessages);
    });
    socket.on('isTyping', (data) => {
        const { socket_to, typing, chat_id: noticeChat_id } = data;
        io.to(socket_to).emit('isTyping', { typing, noticeChat_id });
    });
    socket.on('getAllMessages', (chat_id) => {
        usersChat.getAllMessages(chat_id).then((messages) => {
            io.to(socket.id).emit('getAllMessages', messages);
        });
    });
    socket.on('disconnect', () => {
        const user = usersChat.deleteUser(socket.id);
        const { email } = user.deleteUser;
        const { users } = user.users;
        io.emit('enterChat', users);
        console.log(`An user has disconnected ${email}`);
    });
};
exports.Sockets = Sockets;
//# sourceMappingURL=socket.js.map