import { io } from 'socket.io-client';

const URL = 'https://crimson-server.onrender.com'//'http://localhost:3001';

export const socket = io(URL, {
    reconnection: true,
    autoConnect: true,
});