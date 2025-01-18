import { Users } from "@/interface/users";
import { socket } from "../socket/socket";
import { create } from "zustand";

interface State {
    isLoading: boolean;
    users: any[],
    messages: any[],
    message: Object,
    socket_to: string;
    user_id: string;
    user_to_id: string;
    chat_id: string;
    lastMessages: any[],
    isTyping: boolean;
    current_chat_id: string;
    chat_typing: string;
    newUsers: any[];
    newLastMessages: any[];

    getUsers: () => void;
    reconnect: (user: Users) => void;
    sendMessage: (message: string) => void;
    socketTo: (socket_to: string, user_id: string) => void;
    getAllMessages: (chat_id: string, socket_to: string, user_id: string) => void;
    setLastMessages: () => void
    getMessage: () => void;
    Typing: (typing: boolean) => void;
    search: (value: string, type: number) => void;
    reset: () => void;
}

export const useChatStore2 = create<State>()(
    (set, get) => ({
        isLoading: false,
        users: [],
        messages: [],
        socket_to: '',
        user_id: '',
        user_to_id: '',
        message: { message: '', user_id: '', chat_id: '' },
        chat_id: '',
        lastMessages: [],
        isTyping: false,
        current_chat_id: '',
        chat_typing: '',
        newUsers: [],
        newLastMessages: [],
        getUsers() {
            try {
                set({ isLoading: true })
                socket.on('register', function (users: any) {
                    socket.emit('setLastMessages').on('setLastMessages', function (lastMessage: any) {
                        const contacts = users?.map((f: any) => {
                            return {
                                email: f.email,
                                lastname: f.lastname,
                                name: f.name,
                                socket_id: f.socket_id,
                                _id: f._id,
                                chat_id: lastMessage.filter((l: any) => l.lastDocument.user_to == f._id || l.lastDocument.user_from == f._id)[0]?._id,
                                completename: f.completename
                            }
                        })
                        set({ isLoading: false, users: contacts, lastMessages: lastMessage })
                    })
                })
            } catch (error) {
                console.log(error)
            }
        },
        sendMessage(message) {
            try {
                set({ message: {} })
                const { chat_id, users, socket_to, user_to_id } = get()
                const user_id = users.filter(f => f.socket_id == socket.id)[0]._id
                socket.emit('message', { chat_id, message, socket_to, user_id, user_to_id })
            } catch (error) {
                console.log(error)
            }
        },
        getMessage() {
            socket.on('message', (data) => {
                const { users, messages, socket_to } = get()
                const { chat_id } = data
                const user_id = users.filter(f => f.socket_id == socket.id)[0]._id
                if (messages.length == 0) {
                    socket.emit('getAllMessages', { chat_id }).on('getAllMessages', function (messages: any) {
                        setTimeout(() => {
                            set({ messages: messages, chat_id: chat_id, socket_to: socket_to, current_chat_id: chat_id })
                        }, 100);
                    }).emit('join-room', chat_id)
                    return
                }
                set({ isLoading: false, message: data, user_id, chat_id: chat_id })
            })
        },
        setLastMessages() {
            const { socket_to } = get()
            set({ isLoading: true })
            socket.emit('setLastMessages', socket_to).on('setLastMessages', function (lastMessage: any) {
                set({ isLoading: false, lastMessages: lastMessage })
            })
        },
        getAllMessages(chat_id, socket_to, user_id) {
            set({ chat_id: '', socket_to: '', user_to_id: '', current_chat_id: '', isLoading: true })
            setTimeout(() => {
                set({ messages: [], message: {}, })
            }, 345);
            if (!chat_id) {
                return
            }
            socket.emit('getAllMessages', { chat_id }).on('getAllMessages', function (messages: any) {
                setTimeout(() => {
                    set({ messages: messages, chat_id: chat_id, socket_to: socket_to, current_chat_id: chat_id, user_to_id: user_id })
                }, 350);
                setTimeout(() => {
                    set({ isLoading: false })
                }, 900);
            }).emit('join-room', chat_id)
        },
        socketTo(socket_to, user_id) {
            try {
                set({ socket_to: socket_to, chat_id: '', user_to_id: user_id, isLoading: true })
                setTimeout(() => {
                    set({ messages: [], isLoading: false })
                }, 350);
            } catch (error) {
                console.log(error)
            }
        },
        Typing(typing) {
            const { socket_to: to, current_chat_id: chat_id } = get()
            socket.emit('Typing', { to, typing, chat_id }).on('Typing', function (data) {
                const { chat_id, typing } = data
                set({ isTyping: typing, chat_typing: chat_id })
            })
        },
        reconnect(user) {
            try {
                socket.connect().emit('register', user).emit('setLastMessages')
            } catch (error) {
                console.log(error)
            }
        },
        reset() {
            set({ isTyping: false, chat_id: '', socket_to: '', current_chat_id: '', isLoading: false, user_id: '', user_to_id: '' })
            setTimeout(() => {
                set({ messages: [], message: {}, })
            }, 350);
        },
        search(value, type) {
            const { users, lastMessages } = get()
            if (type === 0) {
                set({ newUsers: [], newLastMessages: [] })
                return
            }
            if (type === 1) {
                const newUsers = value.trim().length == 0 ? users : users.filter(f => f.email.toLowerCase().startsWith(value.toLowerCase()))
                set({ newUsers: newUsers })
                return
            }
            const newLastMessages = value.trim().length == 0 ? lastMessages : lastMessages.filter(f => f.lastDocument.chats_dets.message.toLowerCase().includes(value.toLowerCase()))
            set({ newLastMessages: newLastMessages })
        },
    })
)