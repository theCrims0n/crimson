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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../routes/auth/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const socket2_1 = require("../socket/socket2");
class Server {
    constructor() {
        this.apiAuth = '/api/auth';
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.connection = process.env.MONGO_URL_CLOUD || 'mongodb+srv://crimson:xQq8avFit8te3zFE@crimson.56k6s.mongodb.net/crimson';
        this.server = (0, node_http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, { cors: { origin: 'http://localhost:3000' }, connectionStateRecovery: {} });
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.sockets();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect(this.connection).then(() => {
                console.log('DB is running correctly');
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            credentials: true,
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static('public'));
        this.app.use((0, cookie_parser_1.default)());
    }
    routes() {
        this.app.use(this.apiAuth, auth_1.default);
    }
    sockets() {
        this.io.on('connection', (socket) => {
            (0, socket2_1.Sockets2)(socket, this.io);
        });
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map