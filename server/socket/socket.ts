import { Socket } from 'socket.io'
import Chat from '../controller/socket/users';

const usersChat = new Chat();

export const Sockets = (socket: Socket, io: any) => {

    console.log('An user has connected')

    socket.on('enterChat', (user: any) => {
        const { email, name, lastname, _id } = user
        usersChat.addUsers(_id, email, name, lastname, socket.id).then((users) => {
            io.emit('enterChat', users)
            console.log(users)
        })
    })

    socket.on('sendMessage', async (data: any) => {
        const { chat_id, message, user_to, unreadMessages } = data
        const result: any = await usersChat.createChat(chat_id, message, socket.id, user_to)
        if (result) {
            const { messages, chats_id } = result
            const user: any = await usersChat.findUser(user_to)
            if (user) {
                const { socket_id } = user
                io.to(socket_id).emit('isTyping', { typing: false, noticeChat_id: chat_id })
                io.to([socket_id, socket.id]).emit('sendMessage', { messages, chats_id, unreadMessages })
            }
        }
    })

    socket.on('setLastMessages', () => {
        usersChat.setLastMessages(socket.id).then(async (lastMessage) => {
            io.to(socket.id).emit('setLastMessages', lastMessage)
        })
    })

    socket.on('unreadMessages', (data) => {
        const { socket_to, unreadMessages, chat_id }: any = data
        unreadMessages.count++
        unreadMessages.chat_id = chat_id
        io.to(socket_to).emit('unreadMessages', unreadMessages)
    })

    socket.on('isTyping', (data) => {
        const { socket_to, typing, chat_id: noticeChat_id } = data
        io.to(socket_to).emit('isTyping', { typing, noticeChat_id })
    })

    socket.on('getAllMessages', (chat_id: string) => {
        usersChat.getAllMessages(chat_id).then((messages) => {
            io.to(socket.id).emit('getAllMessages', messages)
        })
    })

    socket.on('disconnect', () => {
        const user: any = usersChat.deleteUser(socket.id)
        const { email } = user.deleteUser
        const { users } = user.users
        io.emit('enterChat', users)
        console.log(`An user has disconnected ${email}`)
    })
}