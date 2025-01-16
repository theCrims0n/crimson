"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
class SocketServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.server = (0, node_http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, { cors: { origin: 'http://localhost:3000' }, connectionStateRecovery: {} });
    }
    sockets() {
        this.io.on('connection', (socket) => {
            console.log(socket.id);
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Socket Server is running on port ' + this.port);
        });
    }
}
exports.default = SocketServer;
//# sourceMappingURL=socket.js.map