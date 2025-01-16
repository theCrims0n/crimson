import { create } from 'zustand'
import { socket } from '../socket/socket';

interface State {
    isLoading: boolean;
    isLoadingLastChats: boolean;
    isLoadingContacts: boolean;
    user_to: string;
    messages: string[];
    allMessages: string[];
    contacts: any[];
    lastMessages: any[];
    chat_id: string;
    isTyping: boolean;
    unreadMessages: Object;
    noticeChat_id: string;
    currentChat_Id: string;
    getUsers: () => void;
    sendMessage: (message: string) => void;
    connectSocket: (user: any) => void;
    sendLastMessages: () => void;
    getAllMessages: (chat_id: string, user_to: string) => void;
    getSocket_To: (socket_to: string) => void;
    Typing: (typing: boolean) => void;
}

export const useChatStore = create<State>()(
    (set, get) => ({
        isLoading: false,
        isLoadingLastChats: false,
        isLoadingContacts: false,
        user_to: '',
        messages: [],
        allMessages: [],
        contacts: [],
        lastMessages: [],
        chat_id: '',
        isTyping: false,
        unreadMessages: { chat_id: '', count: 0 },
        noticeChat_id: '',
        currentChat_Id: '',
        getUsers: () => {
            set({ isLoadingContacts: true })
            socket.emit('getUsersConnected').on('getUsersConnected', function (users: any) {
                set({ isLoadingContacts: false, contacts: users })
            })
        },
        sendMessage(message) {
            const { chat_id, user_to, unreadMessages, contacts } = get()
            const socket_to = contacts.filter(f => f._id == user_to)[0]?.socket_id
            socket.emit('sendMessage', { chat_id, message, user_to, unreadMessages }).on('sendMessage', function (result) {
                const { messages, chats_id } = result
                if (messages) {
                    setTimeout(() => {
                        set({ allMessages: messages, chat_id: chats_id })
                    }, 110);
                }
            }).emit('unreadMessages', { unreadMessages, socket_to, chat_id }).on('unreadMessages', function (unreadMessages) {
                set({ unreadMessages: unreadMessages })
            })
        },
        sendLastMessages() {
            set({ isLoadingLastChats: true })
            socket.emit('setLastMessages').on('setLastMessages', function (lastMessage: any) {
                set({ isLoadingLastChats: false, lastMessages: lastMessage })
            })
        },
        getAllMessages(chat_id, user_to) {
            set({ isLoading: true, allMessages: [] })
            socket.emit('getAllMessages', chat_id).on('getAllMessages', function (messages: any) {
                setTimeout(() => {
                    set({
                        isLoading: false, allMessages: messages, chat_id: chat_id, user_to: user_to, currentChat_Id: chat_id,
                        unreadMessages: { chat_id: '', count: 0 }
                    })
                }, 300);
            })
        },
        getSocket_To(user_to) {
            set({ user_to: user_to, allMessages: [], chat_id: '', unreadMessages: { chat_id: '', count: 0 } })
        },
        Typing(typing) {
            const { contacts, user_to, chat_id } = get()
            if (user_to.trim().length == 0 && chat_id.trim().length == 0) { return }
            const socket_to = contacts.filter(f => f._id == user_to)[0]?.socket_id
            socket.emit('isTyping', { socket_to, typing, chat_id }).on('isTyping', function (result) {
                const { noticeChat_id, typing } = result
                set({ isTyping: typing, noticeChat_id: noticeChat_id })
            })
        },
        connectSocket: (user) => {
            try {
                const { lastMessages } = get()
                set({ isLoading: true, isLoadingContacts: true })
                socket.connect();
                console.log(user)
                socket.emit('register', user).on('register', function (users: any) {
                    const contacts = users?.map((f: any) => {
                        return {
                            email: f.email,
                            lastname: f.lastname,
                            name: f.name,
                            socket_id: f.socket_id,
                            _id: f._id,
                            chat_id: lastMessages.filter(l => l.lastDocument.user_to == f._id || l.lastDocument.user_from == f._id)[0]?._id
                        }
                    })
                    console.log(contacts)
                    set({ isLoading: false, contacts: contacts, isLoadingContacts: false })
                })
            } catch (error: any) {
                console.log(error)
            }
        },
    }))