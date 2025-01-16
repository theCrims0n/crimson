import { io } from 'socket.io-client';

const URL = 'https://crimson-server.onrender.com';

export const socket = io(URL, {
    reconnection: true,
    autoConnect: true,
});