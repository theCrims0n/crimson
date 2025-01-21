import { Socket } from "socket.io";
import { Chat2 } from "../controller/socket2/users";
import { Users } from "../interface/users";
import { resolveModuleNameFromCache } from "typescript";

const chat = new Chat2();


export const Sockets2 = (socket: Socket, io: any) => {


    console.log('An user has connected')

    socket.on('register', (user: Users) => {

        user.socket_id = socket.id

        chat.addUsers(user).then((users) => {
            io.emit('register', users)
            console.log(users)
        })
    })

    socket.on('message', async (data) => {

        const { chat_id: id, message, socket_to, user_id, user_to_id } = data

        const chat_id = await chat.saveMassages(id, message, user_id, user_to_id)
        io.emit('Typing', false)

        io.to(socket.id).to(id).emit('message', { message, user_id, chat_id })
    })

    socket.on('setLastMessages', (socket_to) => {
        chat.setLastMessages(socket.id, socket_to).then(async (lastMessage) => {
            const { messages, messagesTo } = lastMessage
            io.to(socket.id).emit('setLastMessages', messages)
            io.to(socket_to).emit('setLastMessages', messagesTo)
        })
    })

    socket.on('join-room', (room) => {
        socket.join(room)
    })

    socket.on('leave-room', (room) => {
        socket.leave(room)
    })

    socket.on('getAllMessages', async ({ chat_id }) => {
        const messages = await chat.getAllMessages(chat_id)
        io.to(socket.id).emit('getAllMessages', messages)
    })

    socket.on('Typing', (data) => {
        const { to, typing, chat_id } = data
        io.to(to).emit('Typing', { typing, chat_id })
    })

    socket.on('disconnect', () => {
        
        const users = chat.deleteUser(socket.id)
        io.emit('register', users)
        console.log('an user has disconnect')
        console.log(users)
    })
}