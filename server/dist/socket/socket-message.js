"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sockets = void 0;
const users_1 = __importDefault(require("../controller/socket/users"));
const usersChat = new users_1.default();
const Sockets = (socket) => {
    console.log('An user has connected');
    socket.on('enterChat', (user) => {
        const { email, name, lastname, _id } = user;
        usersChat.addUsers(_id, email, name, lastname, socket.id);
    });
    socket.on('disconnect', () => {
        const user = usersChat.deleteUser(socket.id);
        const { name } = user;
        console.log(`An user has disconnected ${name}`);
    });
};
exports.Sockets = Sockets;
//# sourceMappingURL=socket-message.js.map