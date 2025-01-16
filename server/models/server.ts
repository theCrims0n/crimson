import express, { Application } from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import authRoutes from '../routes/auth/auth'
import cookieParser from 'cookie-parser'
import { createServer } from 'node:http';
import { Server as ServerSocket, Socket } from 'socket.io'
import { Sockets2 } from '../socket/socket2';

class Server {

    private app: Application;
    private port: string;
    private apiAuth: string
    private connection: string;
    private io: any;
    private server: any;

    constructor() {
        this.apiAuth = '/api/auth';
        this.app = express();
        this.port = process.env.PORT || '3001'
        this.connection = process.env.MONGO_URL_CLOUD || 'mongodb+srv://crimson:xQq8avFit8te3zFE@crimson.56k6s.mongodb.net/crimson'
        this.server = createServer(this.app)
        this.io = new ServerSocket(this.server, { cors: { origin: 'https://crimson-01b3.onrender.com' }, connectionStateRecovery: {} })
        this.dbConnection();
        this.middlewares();
        this.routes();
        this.sockets();
    }

    async dbConnection() {
        await mongoose.connect(this.connection).then(() => {
            console.log('DB is running correctly')
        }).catch((err) => {
            console.log(err)
        })
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(cors({
            credentials: true,
            origin: 'https://crimson-01b3.onrender.com',
            methods: ['GET', 'POST', 'PUT', 'DELETE']
        }))
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static('public'))
        this.app.use(cookieParser())
    }

    routes() {
        this.app.use(this.apiAuth, authRoutes)
    }

    sockets() {
        this.io.on('connection', (socket: Socket) => {
            Sockets2(socket, this.io)
        })
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port)
        })
    }
}

export default Server